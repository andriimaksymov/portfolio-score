import { Box, Typography, Stack } from '@mui/material';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import type { AnalysisResult } from '../../types/analysis.types';
import { GlassCard, WidgetHeader, WidgetContent } from './styles';

interface TechnicalHealthWidgetProps {
  scores: AnalysisResult['scores'];
}

export default function TechnicalHealthWidget({ scores }: TechnicalHealthWidgetProps) {
  const radarData = [
    { subject: 'Activity', A: scores.activity, fullMark: 100 },
    { subject: 'Quality', A: scores.projectQuality, fullMark: 100 },
    { subject: 'Consistency', A: scores.consistency, fullMark: 100 },
    { subject: 'Stack', A: scores.techStackDiversity, fullMark: 100 },
  ];

  // Mock trend data for sparklines (in a real app, this would come from history)
  const getMockTrend = (base: number) => {
    return Array.from({ length: 10 }).map((_, i) => ({
      value: Math.max(0, Math.min(100, base + (Math.random() * 20 - 10) + (i * 2)))
    }));
  };

  const metrics = [
    { label: 'Activity', value: scores.activity, color: '#3b82f6' },
    { label: 'Quality', value: scores.projectQuality, color: '#22c55e' },
    { label: 'Stack', value: scores.techStackDiversity, color: '#f97316' },
    { label: 'Consistency', value: scores.consistency, color: '#a855f7' },
  ];

  return (
    <GlassCard sx={{ height: '100%' }}>
      <WidgetHeader>
        <Typography variant="h6" fontWeight="700">Technical Health</Typography>
      </WidgetHeader>
      <WidgetContent>
        <Stack direction={{ xs: 'column', xl: 'row' }} spacing={4} alignItems="center">
          
          {/* Radar Chart */}
          <Box sx={{ width: '100%', maxWidth: 300, height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Portfolio"
                  dataKey="A"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fill="#8b5cf6"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </Box>

          {/* Metrics List with Sparklines */}
          <Box sx={{ flex: 1, width: '100%' }}>
            <Stack spacing={3}>
              {metrics.map((metric) => (
                <Stack key={metric.label} direction="row" alignItems="center" spacing={2}>
                  <Box sx={{ width: 80 }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                      {metric.label}
                    </Typography>
                    <Typography variant="h6" fontWeight="700" sx={{ lineHeight: 1 }}>
                      {metric.value}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ flex: 1, height: 32 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={getMockTrend(metric.value)}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke={metric.color} 
                          strokeWidth={2} 
                          dot={false} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </Stack>
              ))}
            </Stack>
          </Box>
        </Stack>
      </WidgetContent>
    </GlassCard>
  );
}
