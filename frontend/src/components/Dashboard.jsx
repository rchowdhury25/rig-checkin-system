import './Dashboard.css';
import '../styling/Buttons.css';
import '../styling/Cards.css';
import '../styling/Layout.css';
import '../styling/Stacks.css';
import '../styling/Stats.css';
import '../styling/RecentActivity.css';
import React, { useMemo, useState } from 'react';
import { Users, UserCheck, Clock, TrendingUp, Eye, UserPlus, LogIn, LogOut, Calendar, ChevronRight, X } from 'lucide-react';

import ChartModal from './ChartModal';
import CheckInModal from './CheckinModal';
import badgeTypeClass from '../utils/GeneralUtils';
import { initialPeople } from '../data/initialPeople';
import { getCardData } from '../utils/cardTemplate';
import { computeStats, generateHourlyData, toISODate } from '../utils/accessStats';


const Dashboard = () => {

  const [people, setPeople] = useState(initialPeople);
  const [selectedDate, setSelectedDate] = useState('2025-08-08');
  const [selectedCard, setSelectedCard] = useState(null); // 'visitors' | 'employees' | 'vendors'
  const [showCheckInForm, setShowCheckInForm] = useState(false);
  const [viewMode, setViewMode] = useState('today');      // 'today' | 'week'

  const stats = useMemo(() => computeStats(people, selectedDate), [people, selectedDate]);
  const chartData = useMemo(() => 
    generateHourlyData(people, selectedDate, 4, { demoVariation: true }),[people, selectedDate]);
  const cardData = useMemo(() => getCardData(stats), [stats]);
  const statusClass = (status) => (status === 'checked-in' ? 'status status-in' : 'status status-out');

  const handleCheckOut = (id) => {
    setPeople(people.map(p => 
      p.id === id 
        ? { ...p, status: 'checked-out', checkOutTime: new Date().toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' }) }
        : p
    ));
  };

  const formatTime = (d = new Date()) =>
                      d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

  const handleCheckInSubmit = (form) => {
    const now = new Date();
    const hour = now.getHours();
    const newEntry = {
      id: Math.max(0, ...people.map(p => p.id)) + 1,
      name: form.name,
      type: form.type,                  // 'visitor' | 'employee' | 'vendor'
      phone: form.phone,
      purpose: form.purpose || undefined,
      department: form.department || undefined,
      company: form.company || undefined,
      status: 'checked-in',
      checkInTime: formatTime(now),
      date: selectedDate,               // align to current dashboard date
      hour,
    };
    setPeople(prev => [newEntry, ...prev]);
    setShowCheckInForm(false);
  };

  return (
    <div className="page">
      <div className="container">
        <div className="header">
          <div>
            <h1 className="h1">Rig Access Control Dashboard</h1>
            <p className="muted">Facility management system</p>
          </div>
          <button onClick={() => setShowCheckInForm(true)} className="btn btn-primary">
            <UserPlus className="icon-sm" />
            <span>Check In Person</span>
          </button>

          <CheckInModal
            isOpen={showCheckInForm}
            onClose={() => setShowCheckInForm(false)}
            onSubmit={handleCheckInSubmit} />
        </div>

        <div className="card main-stat">
          <div className="main-stat-head">
            <div>
              <h2 className="h2">Currently Inside</h2>
              <p className="muted">Real-time occupancy</p>
            </div>
            <div className="round green-soft">
              <UserCheck className="icon-lg green" />
            </div>
          </div>
          <div className="main-stat-value">{stats.checkedIn}</div>
          <div className="muted small">Out of {stats.todayTotal} entries today</div>
        </div>

        <div className="grid-3 gap-16">
          {cardData.map(card => (
            <div key={card.id} onClick={() => setSelectedCard(card.id)} className={`${card.cardTone} hoverable`}>
              <div className="card-head">
                <div>
                  <h3 className="h3">{card.title}</h3>
                  <p className="muted small">{card.subtitle}</p>
                </div>
                <ChevronRight className="icon-sm text-muted" />
              </div>
              <div className="card-stats">
                <div className="left">
                  <div className={card.colorClass}>
                    <LogIn className="icon-xs white" />
                  </div>
                  <div>
                    <div className="big">{card.inside}</div>
                    <div className="muted tiny">Inside</div>
                  </div>
                </div>

                <div className="right">
                  <div className="big">{card.total}</div>
                  <div className="muted tiny">Total</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <h2 className="h2 mb-16">Recent Activities</h2>
          <div className="stack-12">
            {people.slice(0, 4).map(person => (
              <div key={person.id} className="activity">
                <div className="activity-left">
                  <div className="avatar blue">
                    <span className="avatar-text">
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="h4">{person.name}</h4>
                    <div className="row-8 muted small">
                      <span className={badgeTypeClass(person.type)}>{person.type}</span>
                      <span>•</span>
                      <span>{person.phone}</span>
                    </div>
                    {person.purpose && <p className="tiny muted">Purpose: {person.purpose}</p>}
                    {person.department && <p className="tiny muted">Department: {person.department}</p>}
                    {person.company && <p className="tiny muted">Company: {person.company}</p>}
                  </div>
                </div>
                <div className="activity-right">
                  <div className={statusClass(person.status)}>
                    {person.status === 'checked-in' ? <LogIn className="icon-xs" /> : <LogOut className="icon-xs" />}
                    <span className="status-text">{person.status}</span>
                  </div>
                  <div className="tiny muted mt-4">
                    In: {person.checkInTime}
                    {person.checkOutTime && <> • Out: {person.checkOutTime}</>}
                  </div>
                  {person.status === 'checked-in' && (
                    <button onClick={() => handleCheckOut(person.id)} className="btn btn-danger tiny mt-8">
                      Check Out
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {selectedCard && (
          <ChartModal
            selectedCard={selectedCard}
            viewMode={viewMode}
            onChangeView={setViewMode}
            onClose={() => setSelectedCard(null)}
            stats={stats}
            chartData={chartData}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;