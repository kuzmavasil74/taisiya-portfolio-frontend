import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import styles from '../AdminStatsCharts/AdminStatsCharts.module.css'
import { useTranslation } from 'react-i18next'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const AdminStatsCharts = ({ stats }) => {
  const { t } = useTranslation()
  if (!stats) return null

  const bookingsPerDayData = stats.bookingsPerDay.map((b) => ({
    date: b._id,
    count: b.count,
  }))

  const bookingsStatusData = Object.entries(stats.bookingsStatus).map(
    ([status, value]) => ({
      name: t(`bookingsStatus.${status}`),
      value,
    })
  )

  return (
    <div className={styles.chartsContainer}>
      <div className={styles.chartSection}>
        <h3>{t('stats.bookingsLast7Days')}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={bookingsPerDayData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className={styles.chartSection}>
        <h3>{t('stats.bookingsStatus')}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={bookingsStatusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {bookingsStatusData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default AdminStatsCharts
