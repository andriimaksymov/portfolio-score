import { Box, Chip, Stack, Typography, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import VerifiedIcon from '@mui/icons-material/Verified';
import type { AnalysisResult } from '../../types/analysis.types';
import { GlassCard, WidgetContent, WidgetHeader } from './styles';

interface FeaturedProjectWidgetProps {
    analysis: AnalysisResult;
}

export default function FeaturedProjectWidget({ analysis }: FeaturedProjectWidgetProps) {
    const { aiInsights } = analysis;
    // Fallback if no flagship projects or array empty
    const flagship = aiInsights?.flagshipProjects?.[0];

    const project = {
        name: flagship?.name || 'portfolio-score',
        description: flagship?.reason || 'A comprehensive tool for analyzing developer portfolios.',
        technologies: flagship?.technologies || [],
        stars: flagship?.stars || 0,
        url: flagship?.url,
        suggestions: flagship?.improvements || ['Add a detailed contribution guide to attract more open-source developers.']
    };

    return (
        <GlassCard sx={{ height: 'fit-content' }}>
            <WidgetHeader>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <VerifiedIcon sx={{ color: 'var(--accent-primary)' }} />
                    <Typography variant="h6" fontWeight="700">Flagship Project</Typography>
                </Stack>
            </WidgetHeader>

            <WidgetContent>
                <Typography variant="h5" fontWeight="800" gutterBottom>
                    {project.name}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.6 }}>
                    {project.description}
                </Typography>

                <Box sx={{ mb: 3 }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700, mb: 1, display: 'block' }}>
                        TECH STACK
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {project.technologies?.map((tech: string) => (
                            <Chip
                                key={tech}
                                label={tech}
                                size="small"
                                sx={{
                                    bgcolor: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'text.primary'
                                }}
                            />
                        ))}
                    </Box>
                </Box>

                <Box sx={{ p: 2, bgcolor: 'rgba(59, 130, 246, 0.1)', borderRadius: 2, mb: 3, border: '1px dashed rgba(59, 130, 246, 0.3)' }}>
                    <Typography variant="caption" sx={{ color: 'var(--accent-primary)', fontWeight: 700, mb: 1, display: 'block' }}>
                        AI SUGGESTION
                    </Typography>
                    <Typography variant="body2" component="ul" sx={{ fontSize: '0.85rem' }}>
                        {project.suggestions.map((suggestion: string) => (
                            <li key={suggestion}>{suggestion}</li>
                        ))}
                    </Typography>
                </Box>

                <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<GitHubIcon />}
                    href={project.url || '#'}
                    target="_blank"
                    sx={{
                        color: 'text.primary',
                        borderColor: 'rgba(255,255,255,0.2)',
                        '&:hover': { borderColor: 'text.primary', bgcolor: 'rgba(255,255,255,0.05)' }
                    }}
                >
                    View Repository
                </Button>
            </WidgetContent>
        </GlassCard>
    );
}
