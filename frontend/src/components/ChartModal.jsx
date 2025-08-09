import '../styling/SegmentedControl.css';
import '../styling/Modal.css';
import '../styling/Panels.css';
import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

export default function ChartModal({
                                        selectedCard,          // 'visitors' | 'employees' | 'vendors' (or null)
                                        viewMode,              // 'today' | 'week'
                                        onChangeView,          // (mode) => void
                                        onClose,               // () => void
                                        stats,                 // computed stats object
                                        chartData              // array for recharts
                                    }) {

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose?.();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!selectedCard) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div>
            <h2 className="modal-title">{selectedCard} Analytics</h2>
            <div className="segmented">
              <button
                onClick={() => onChangeView('today')}
                className={`seg-btn ${viewMode === 'today' ? 'seg-btn-active' : ''}`}
              >
                Today
              </button>
              <button
                onClick={() => onChangeView('week')}
                className={`seg-btn ${viewMode === 'week' ? 'seg-btn-active' : ''}`}
              >
                Last 7 Days
              </button>
            </div>
          </div>
          <button onClick={onClose} className="icon-btn" aria-label="Close analytics">
            <X className="icon-md text-muted" />
          </button>
        </div>

        <div className="grid-2 gap-24 mb-24">
          <div className="panel">
            <h3 className="panel-title">Entries</h3>
            <div className="stat-list">
              <div className="stat-row">
                <div className="stat-left">
                  <div className="dot dot-pink" />
                  <span className="muted">Visitors - {stats.visitorsToday}</span>
                </div>
                <span className="strong">{stats.visitorsInside}</span>
              </div>
              <div className="stat-row">
                <div className="stat-left">
                  <div className="dot dot-green" />
                  <span className="muted">Employees - {stats.employeesToday}</span>
                </div>
                <span className="strong">{stats.employeesInside}</span>
              </div>
              <div className="stat-row">
                <div className="stat-left">
                  <div className="dot dot-purple" />
                  <span className="muted">Vendors - {stats.vendorsToday}</span>
                </div>
                <span className="strong">{stats.vendorsInside}</span>
              </div>

              <div className="divider" />
              <div className="total-row">
                <span className="strong">Total - {stats.todayTotal}</span>
                <span className="strong">{stats.checkedIn}</span>
              </div>
            </div>
          </div>

          <div className="panel">
            <h3 className="panel-title">Staying Inside</h3>
            <div className="stat-list">
              <div className="stat-row">
                <span className="muted">Visitors</span>
                <span className="strong">{stats.visitorsInside}</span>
              </div>
              <div className="stat-row">
                <span className="muted">Employees</span>
                <span className="strong">{stats.employeesInside}</span>
              </div>
              <div className="stat-row">
                <span className="muted">Vendors</span>
                <span className="strong">{stats.vendorsInside}</span>
              </div>

              <div className="divider" />
              <div className="total-row">
                <span className="strong">Total Currently Inside</span>
                <span className="strong">{stats.checkedIn}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="panel bordered">
          <h3 className="panel-title">Hourly Traffic Pattern</h3>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="visitor" stroke="#e91e63" strokeWidth={3} dot={{ r: 4 }} name="Visitors" />
                <Line type="monotone" dataKey="employee" stroke="#4caf50" strokeWidth={3} dot={{ r: 4 }} name="Employees" />
                <Line type="monotone" dataKey="vendor" stroke="#9c27b0" strokeWidth={3} dot={{ r: 4 }} name="Vendors" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}