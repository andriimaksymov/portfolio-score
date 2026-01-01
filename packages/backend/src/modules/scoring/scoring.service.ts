import { Injectable } from '@nestjs/common';

@Injectable()
export class ScoringService {
  calculateScore(githubData: any) {
    const activityScore = this.calculateActivityScore(githubData);
    const projectQualityScore = this.calculateProjectQualityScore(githubData);
    const techStackScore = this.calculateTechStackScore(githubData);
    const consistencyScore = this.calculateConsistencyScore(githubData);

    const overall = Math.round(
      (activityScore +
        projectQualityScore +
        techStackScore +
        consistencyScore) /
        4,
    );

    return {
      overall,
      activity: activityScore,
      projectQuality: projectQualityScore,
      techStackDiversity: techStackScore,
      consistency: consistencyScore,
    };
  }

  private calculateActivityScore(githubData: any): number {
    const { profile, repositories, events } = githubData;

    // Factors: public repos, followers, total stars, recent activity
    const repoCount = Math.min(profile.public_repos / 20, 1) * 25;
    const followersScore = Math.min(profile.followers / 50, 1) * 25;
    const starsScore =
      Math.min(
        repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0) /
          100,
        1,
      ) * 25;
    const eventsScore = Math.min(events.length / 50, 1) * 25;

    return Math.round(repoCount + followersScore + starsScore + eventsScore);
  }

  private calculateProjectQualityScore(githubData: any): number {
    const { repositories } = githubData;

    if (repositories.length === 0) return 0;

    let totalScore = 0;

    repositories.forEach((repo) => {
      let repoScore = 0;

      // Has description
      if (repo.description) repoScore += 20;

      // Has README (assuming repos with description have README)
      if (repo.description && repo.description.length > 20) repoScore += 20;

      // Has topics/tags
      if (repo.topics && repo.topics.length > 0) repoScore += 20;

      // Has stars
      if (repo.stargazers_count > 0) repoScore += 20;

      // Has been updated recently (within 6 months)
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      if (new Date(repo.updated_at) > sixMonthsAgo) repoScore += 20;

      totalScore += repoScore;
    });

    return Math.round(totalScore / repositories.length);
  }

  private calculateTechStackScore(githubData: any): number {
    const { repositories } = githubData;

    const languages = new Set();
    repositories.forEach((repo) => {
      if (repo.language) {
        languages.add(repo.language);
      }
    });

    // More languages = higher diversity
    const diversityScore = Math.min(languages.size / 10, 1) * 100;

    return Math.round(diversityScore);
  }

  private calculateConsistencyScore(githubData: any): number {
    const { events } = githubData;

    if (events.length === 0) return 0;

    // Group events by week
    const weeklyActivity = new Map();

    events.forEach((event) => {
      const date = new Date(event.created_at);
      const weekKey = `${date.getFullYear()}-W${this.getWeekNumber(date)}`;

      weeklyActivity.set(weekKey, (weeklyActivity.get(weekKey) || 0) + 1);
    });

    // Calculate consistency based on number of active weeks
    const activeWeeks = weeklyActivity.size;
    const consistencyScore = Math.min(activeWeeks / 12, 1) * 100;

    return Math.round(consistencyScore);
  }

  private getWeekNumber(date: Date): number {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear =
      (date.getTime() - firstDayOfYear.getTime()) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }
}
