import React from 'react';

const Home = () => {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', background: '#f4f6fb' }}>
            <header style={{ background: '#1976d2', color: '#fff', padding: '2rem 0', textAlign: 'center' }}>
                <h1>Hospital Management System</h1>
                <p>Efficiently manage patients, doctors, appointments, and more</p>
            </header>
            <main style={{ maxWidth: 1100, margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <section style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem' }}>
                    <a href="/patients" style={{ textDecoration: 'none', color: 'inherit', flex: '1 1 200px' }}>
                        <FeatureCard
                            title="All Patients"
                            description="View and manage all patient records."
                            icon="🧑‍⚕️"
                        />
                    </a>
                    <a href="/add-patient" style={{ textDecoration: 'none', color: 'inherit', flex: '1 1 200px' }}>
                        <FeatureCard
                            title="Add Patient"
                            description="Register a new patient."
                            icon="➕🧑‍⚕️"
                        />
                    </a>
                    <a href="/appointments" style={{ textDecoration: 'none', color: 'inherit', flex: '1 1 200px' }}>
                        <FeatureCard
                            title="All Appointments"
                            description="View and manage all appointments."
                            icon="📅"
                        />
                    </a>
                    <a href="/add-appointment" style={{ textDecoration: 'none', color: 'inherit', flex: '1 1 200px' }}>
                        <FeatureCard
                            title="Add Appointment"
                            description="Schedule a new appointment."
                            icon="➕📅"
                        />
                    </a>
                    <a href="/doctors" style={{ textDecoration: 'none', color: 'inherit', flex: '1 1 200px' }}>
                        <FeatureCard
                            title="Show Doctors"
                            description="View and manage doctor profiles."
                            icon="👨‍⚕️"
                        />
                    </a>
                    <a href="/add-doctor" style={{ textDecoration: 'none', color: 'inherit', flex: '1 1 200px' }}>
                        <FeatureCard
                            title="Add Doctor"
                            description="Register a new doctor."
                            icon="➕👨‍⚕️"
                        />
                    </a>
                </section>
            </main>
            <footer style={{ textAlign: 'center', padding: '1rem', background: '#1976d2', color: '#fff', marginTop: '2rem' }}>
                &copy; {new Date().getFullYear()} Hospital Management System
            </footer>
        </div>
    );
};

const FeatureCard = ({ title, description, icon }) => (
    <div style={{
        flex: '1 1 200px',
        background: '#e3eafc',
        borderRadius: 8,
        padding: '1.5rem',
        textAlign: 'center',
        minWidth: 200,
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
    }}>
        <div style={{ fontSize: 40, marginBottom: 10 }}>{icon}</div>
        <h2 style={{ margin: '0 0 0.5rem 0', fontSize: 22 }}>{title}</h2>
        <p style={{ color: '#555' }}>{description}</p>
    </div>
);

export default Home;