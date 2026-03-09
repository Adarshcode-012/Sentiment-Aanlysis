import { mockData } from '../mock/mockData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getStats = async (filters = {}) => {
    await delay(500);
    // Simulate filtering impact
    const baseStats = { ...mockData.stats };
    if (filters.range === 'L30D') baseStats.totalDataPoints *= 4;
    return baseStats;
};

export const getSentimentDistribution = async () => {
    await delay(500);
    return mockData.sentimentDistribution;
};

export const getSentimentTrend = async (filters = {}) => {
    await delay(500);
    const trend = [...mockData.sentimentTrend];
    if (filters.range === 'L7D') return trend.slice(-7);
    return trend;
};

export const getSectorSentiment = async () => {
    await delay(500);
    return mockData.sectorSentiment;
};

export const getLiveSignals = async () => {
    await delay(300);
    return mockData.liveSignals;
};

export const getTopics = async () => {
    await delay(500);
    return mockData.topics;
};

export const getAlerts = async () => {
    await delay(500);
    return mockData.alerts;
};

export const getProductSentiment = async () => {
    await delay(500);
    return mockData.productSentiment;
};

export const getRAGResponse = async (query) => {
    await delay(1000);
    return { query, response: mockData.ragResponse };
};
