'use client';

import { useState, useEffect } from 'react';
import { FaUsers, FaPlus, FaTimes, FaEdit, FaTrash, FaUserShield, FaEye, FaUserPlus, FaCrown, FaEnvelope, FaCheck } from 'react-icons/fa';
import { teamApi } from '../lib/api';
import styles from './team.module.css';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Viewer';
  status: 'Active' | 'Pending' | 'Inactive';
  joinedDate: string;
  avatar?: string;
}

export default function TeamManagement() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    email: '',
    role: 'Viewer' as 'Admin' | 'Viewer',
    message: ''
  });
  const [editingMember, setEditingMember] = useState<string | null>(null);

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    try {
      const response = await teamApi.getMembers();
      if (response.success && response.members) {
        setTeamMembers(response.members);
      }
    } catch (error) {
      console.error('Failed to load team members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async () => {
    if (inviteForm.email) {
      try {
        const response = await teamApi.inviteMember(inviteForm.email, inviteForm.role);
        if (response.success && response.member) {
          setTeamMembers([...teamMembers, response.member]);
          setInviteForm({ email: '', role: 'Viewer', message: '' });
          setShowInviteModal(false);
        }
      } catch (error) {
        console.error('Failed to invite member:', error);
      }
    }
  };

  const handleRemoveMember = async (id: string) => {
    try {
      const response = await teamApi.removeMember(id);
      if (response.success) {
        setTeamMembers(teamMembers.filter(member => member.id !== id));
      }
    } catch (error) {
      console.error('Failed to remove member:', error);
    }
  };

  const handleRoleChange = async (id: string, newRole: 'Admin' | 'Viewer') => {
    try {
      const response = await teamApi.updateMemberRole(id, newRole);
      if (response.success && response.member) {
        setTeamMembers(teamMembers.map(member => 
          member.id === id ? { ...member, role: newRole } : member
        ));
        setEditingMember(null);
      }
    } catch (error) {
      console.error('Failed to update member role:', error);
    }
  };


  const getStatusBadge = (status: string) => {
    const statusClasses = {
      Active: styles.statusActive,
      Pending: styles.statusPending,
      Inactive: styles.statusInactive
    };
    return statusClasses[status as keyof typeof statusClasses] || '';
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>
            <FaUsers className={styles.titleIcon} />
            Team Management
          </h1>
          <p className={styles.subtitle}>
            Manage your team members, roles, and permissions
          </p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className={styles.inviteButton}
        >
          <FaUserPlus />
          Invite Member
        </button>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{teamMembers.length}</div>
          <div className={styles.statLabel}>Total Members</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>
            {teamMembers.filter(m => m.status === 'Active').length}
          </div>
          <div className={styles.statLabel}>Active Members</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>
            {teamMembers.filter(m => m.role === 'Admin').length}
          </div>
          <div className={styles.statLabel}>Admins</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>
            {teamMembers.filter(m => m.status === 'Pending').length}
          </div>
          <div className={styles.statLabel}>Pending Invites</div>
        </div>
      </div>

      <div className={styles.teamTable}>
        <div className={styles.tableHeader}>
          <div className={styles.tableTitle}>Team Members</div>
        </div>
        <div className={styles.tableContent}>
          {teamMembers.map((member) => (
            <div key={member.id} className={styles.memberRow}>
              <div className={styles.memberInfo}>
                <div className={styles.memberAvatar}>
                  {member.name.charAt(0).toUpperCase()}
                </div>
                <div className={styles.memberDetails}>
                  <div className={styles.memberName}>{member.name}</div>
                  <div className={styles.memberEmail}>{member.email}</div>
                </div>
              </div>
              
              <div className={styles.memberRole}>
                {editingMember === member.id ? (
                  <div className={styles.roleEditor}>
                    <select
                      value={member.role}
                      onChange={(e) => handleRoleChange(member.id, e.target.value as 'Admin' | 'Viewer')}
                      className={styles.roleSelect}
                    >
                      <option value="Admin">Admin</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                    <button
                      onClick={() => setEditingMember(null)}
                      className={styles.cancelEdit}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <div className={styles.roleDisplay}>
                    <span className={`${styles.roleBadge} ${member.role === 'Admin' ? styles.roleAdmin : styles.roleViewer}`}>
                      {member.role === 'Admin' ? <FaCrown /> : <FaEye />}
                      {member.role}
                    </span>
                    <button
                      onClick={() => setEditingMember(member.id)}
                      className={styles.editRole}
                    >
                      <FaEdit />
                    </button>
                  </div>
                )}
              </div>

              <div className={styles.memberStatus}>
                <span className={`${styles.statusBadge} ${getStatusBadge(member.status)}`}>
                  {member.status}
                </span>
              </div>

              <div className={styles.memberJoined}>
                {new Date(member.joinedDate).toLocaleDateString()}
              </div>

              <div className={styles.memberActions}>
                <button
                  onClick={() => handleRemoveMember(member.id)}
                  className={styles.removeButton}
                  title="Remove member"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showInviteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Invite Team Member</h2>
              <button
                onClick={() => setShowInviteModal(false)}
                className={styles.closeModal}
              >
                <FaTimes />
              </button>
            </div>
            
            <div className={styles.modalContent}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Email Address</label>
                <div className={styles.inputWrapper}>
                  <FaEnvelope className={styles.inputIcon} />
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={inviteForm.email}
                    onChange={(e) => setInviteForm({...inviteForm, email: e.target.value})}
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Role</label>
                <select
                  value={inviteForm.role}
                  onChange={(e) => setInviteForm({...inviteForm, role: e.target.value as 'Admin' | 'Viewer'})}
                  className={styles.select}
                >
                  <option value="Viewer">Viewer - Can view dashboards and reports</option>
                  <option value="Admin">Admin - Full access and team management</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Personal Message (Optional)</label>
                <textarea
                  placeholder="Add a personal message to the invitation..."
                  value={inviteForm.message}
                  onChange={(e) => setInviteForm({...inviteForm, message: e.target.value})}
                  className={styles.textarea}
                  rows={3}
                />
              </div>
            </div>

            <div className={styles.modalActions}>
              <button
                onClick={() => setShowInviteModal(false)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
              <button
                onClick={handleInvite}
                className={styles.sendInviteButton}
                disabled={!inviteForm.email}
              >
                <FaEnvelope />
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
