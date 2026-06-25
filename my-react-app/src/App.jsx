import './App.css'
import { useState } from 'react'
import WebSecurityGuide from './web_security_study_guide.jsx'
import OSStudyGuide from './os_study_guide.jsx'

function App() {
  const [view, setView] = useState('both') // 'web' | 'os' | 'both'

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, padding: 12, alignItems: 'center', background: '#0b0b0f', borderBottom: '1px solid #222' }}>
        <div style={{ color: '#cbd5e1', fontWeight: 700, marginRight: 8 }}>Study Guides:</div>
        <button onClick={() => setView('web')} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #2b2b3a', background: view === 'web' ? '#6366f1' : '#111216', color: '#fff', cursor: 'pointer' }}>Web</button>
        <button onClick={() => setView('os')} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #2b2b3a', background: view === 'os' ? '#7c3aed' : '#111216', color: '#fff', cursor: 'pointer' }}>OS</button>
        <button onClick={() => setView('both')} style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #2b2b3a', background: view === 'both' ? '#222' : '#0b0b0f', color: '#cbd5e1', cursor: 'pointer' }}>Both</button>
      </div>

      <div>
        {view === 'both' && (
          <>
            <WebSecurityGuide />
            <OSStudyGuide />
          </>
        )}

        {view === 'web' && <WebSecurityGuide />}

        {view === 'os' && <OSStudyGuide />}
      </div>
    </div>
  )
}

export default App
