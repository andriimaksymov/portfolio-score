import { Chip, List, ListItem, ListItemText, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import type { AnalysisResult } from '../../types/analysis.types';
import { GlassCard, WidgetContent, WidgetHeader } from './styles';

interface PriorityRoadmapWidgetProps {
  analysis: AnalysisResult;
}

export default function PriorityRoadmapWidget({ analysis }: PriorityRoadmapWidgetProps) {
  const [tab, setTab] = useState(0);
  const { aiInsights, recommendations } = analysis;

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  // Combine actions into a unified list structure
  const checklistItems = aiInsights?.checklist?.map(item => ({
    label: item.item,
    tag: item.metricTag,
    type: 'checklist'
  })) || [];

  const recommendationItems = recommendations?.map(rec => ({
    label: rec, 
    tag: 'Strategic', 
    type: 'recommendation'
  })) || [];

  return (
    <GlassCard sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <WidgetHeader sx={{ borderBottom: 'none', pb: 0 }}>
            <Typography variant="h6" fontWeight="700">Priority Roadmap</Typography>
            <Tabs value={tab} onChange={handleChange} textColor="secondary" indicatorColor="secondary">
                <Tab label="Actions" />
                <Tab label="Strategy" />
            </Tabs>
        </WidgetHeader>
      
      <WidgetContent sx={{ flex: 1, overflowY: 'auto' }}>
        <List>
            {tab === 0 && checklistItems.map((item, index) => (
                <ListItem 
                    key={index} 
                    sx={{ 
                        bgcolor: 'rgba(255,255,255,0.02)', 
                        mb: 1, 
                        borderRadius: 2,
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                    }}
                >
                    <RadioButtonUncheckedIcon sx={{ mr: 2, color: 'text.secondary' }} />
                    <ListItemText 
                        primary={item.label} 
                        primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                    />
                    <Chip 
                        label={item.tag} 
                        size="small" 
                        sx={{ 
                            height: 20, 
                            fontSize: '0.7rem', 
                            bgcolor: 'rgba(59, 130, 246, 0.1)', 
                            color: '#60a5fa' 
                        }} 
                    />
                </ListItem>
            ))}

            {tab === 1 && recommendationItems.map((item, index) => (
                 <ListItem 
                    key={index} 
                    alignItems="flex-start"
                    sx={{ 
                        bgcolor: 'rgba(255,255,255,0.02)', 
                        mb: 1, 
                        borderRadius: 2,
                    }}
                >
                    <CheckCircleIcon sx={{ mr: 2, color: 'var(--accent-secondary)', mt: 0.5, fontSize: 20 }} />
                    <ListItemText 
                        primary={item.label}
                        secondary="High impact improvement for long term growth." 
                        primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }}
                        secondaryTypographyProps={{ variant: 'caption', color: 'text.secondary' }}
                    />
                </ListItem>
            ))}
        </List>
      </WidgetContent>
    </GlassCard>
  );
}
