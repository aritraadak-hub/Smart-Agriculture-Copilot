let MOCK_NOTIFICATIONS = [
  {
    id: 'notif-101',
    title: 'Rainfall Advisory Alert 🌧️',
    message: 'Moderate rain expected in Ludhiana district within 36 hours. Avoid pesticide spraying.',
    type: 'WEATHER_ALERT',
    isRead: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'notif-102',
    title: 'Market Price Surge 📈',
    message: 'Wheat modal price in Khanna Mandi reached ₹2,380/quintal (+5.2% gain).',
    type: 'MARKET_PRICE',
    isRead: false,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'notif-103',
    title: 'PM-KISAN e-KYC Deadline 🏛️',
    message: 'Complete your e-KYC verification before March 31 to avoid delay in receiving the 17th installment.',
    type: 'SCHEME_DEADLINE',
    isRead: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'notif-104',
    title: 'Irrigation Reminder 💧',
    message: 'Scheduled drip irrigation cycle for Green Harvest Valley (Block B) due today at 5:00 PM.',
    type: 'IRRIGATION_REMINDER',
    isRead: false,
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
];

export const getNotifications = async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: MOCK_NOTIFICATIONS,
      unreadCount: MOCK_NOTIFICATIONS.filter(n => !n.isRead).length,
    });
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id === 'all') {
      MOCK_NOTIFICATIONS = MOCK_NOTIFICATIONS.map(n => ({ ...n, isRead: true }));
    } else {
      MOCK_NOTIFICATIONS = MOCK_NOTIFICATIONS.map(n => n.id === id ? { ...n, isRead: true } : n);
    }
    res.json({ success: true, message: 'Notification state updated' });
  } catch (error) {
    next(error);
  }
};
