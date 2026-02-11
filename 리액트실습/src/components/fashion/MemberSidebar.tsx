import React from 'react';
import { type Member } from '../../constants/members';

interface MemberSidebarProps {
    members: Member[];
    loading: boolean;
    error: string | null;
    selectedMember: Member | null;
    onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const MemberSidebar: React.FC<MemberSidebarProps> = ({
    members,
    loading,
    error,
    selectedMember,
    onSelect
}) => {
    return (
        <aside className="glass-panel animate-fadeIn" style={{
            padding: '2rem',
            borderRadius: '16px',
            height: 'fit-content',
        }}>
            <h2 className="text-header neon-text-cyan" style={{
                marginBottom: '1.5rem',
                fontSize: '1.8rem',
                letterSpacing: '3px',
                borderBottom: '1px solid var(--cyber-cyan)',
                paddingBottom: '0.5rem'
            }}>
                👥 Team Select
            </h2>

            {loading && <p className="glitch-text" style={{ color: 'var(--cyber-text-dim)' }}>SYSTEM LOADING...</p>}
            {error && <p style={{ color: 'var(--cyber-pink)' }}>⚠️ SYSTEM ERROR: {error}</p>}

            {!loading && !error && (
                <div style={{ position: 'relative' }}>
                    <select
                        className="input-cyber"
                        onChange={onSelect}
                        value={selectedMember?.id || ''}
                        style={{ cursor: 'pointer', marginBottom: '1rem' }}
                    >
                        <option value="">-- SELECT AGENT --</option>
                        {members.map(member => (
                            <option key={member.id} value={member.id}>
                                {member.username} [{member.role}]
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {selectedMember && (
                <div className="animate-slideUp" style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(112, 0, 255, 0.1), transparent)',
                    border: '1px solid var(--cyber-purple)',
                    boxShadow: '0 0 20px rgba(112, 0, 255, 0.2)'
                }}>
                    <h3 className="text-header neon-text-pink" style={{
                        marginBottom: '1rem',
                        fontSize: '1.2rem'
                    }}>
                        AGENT PROFILE
                    </h3>
                    <div className="text-body" style={{ display: 'grid', gap: '0.8rem', fontSize: '0.95rem' }}>
                        <p><strong className="neon-text-cyan">ID:</strong> {selectedMember.username}</p>
                        <p><strong className="neon-text-cyan">ROLE:</strong> {selectedMember.role}</p>
                        <p><strong className="neon-text-cyan">STYLE:</strong> {selectedMember.style}</p>
                        <p><strong className="neon-text-cyan">LOC:</strong> {selectedMember.location}</p>
                    </div>
                </div>
            )}
        </aside>
    );
};
