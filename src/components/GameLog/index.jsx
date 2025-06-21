import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  collection,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import {
  FaEye, FaEyeSlash, FaTrash,
  FaDice, FaDiceOne, FaDiceTwo, FaDiceThree, FaDiceFour,
  FaDiceFive, FaDiceSix, FaDiceD20,
  FaCrosshairs, FaRunning, FaShieldAlt, FaFlagCheckered,
  FaComments, FaEye as FaPerception, FaSearch,
  FaChevronLeft, FaChevronRight,
  FaCrown
} from 'react-icons/fa';

import { db } from '../../firebase/config';
import {
  Wrapper,
  HeaderRow,
  Title,
  Pagination,
  PageButton,
  LogContainer,
  LogCard,
  LeftBar,
  Content,
  TitleRow,
  Breakdown,
  Buttons,
  Badge
} from './styles';

/* ---------- ícones de ação ---------- */
const getIcon = (action) => {
  const t = action.toLowerCase();
  const dice = {
    d1: <FaDiceOne />, d2: <FaDiceTwo />, d3: <FaDiceThree />,
    d4: <FaDiceFour />, d5: <FaDiceFive />, d6: <FaDiceSix />
  };
  if (dice[t]) return dice[t];
  if (t.includes('ataque')) return <FaCrosshairs />;
  if (t.includes('esquiva') || t.includes('defesa')) return <FaRunning />;
  if (t.includes('bloqueio')) return <FaShieldAlt />;
  if (t.includes('iniciativa')) return <FaFlagCheckered />;
  if (t.includes('convencer')) return <FaComments />;
  if (t.includes('percep')) return <FaPerception />;
  if (t.includes('invest')) return <FaSearch />;
  return <FaDiceD20 />;
};

/* ---------- breakdown -------- */
const breakdownStr = (log) => {
  if (!log?.individualResults) return '';
  const dice = `[${log.individualResults.join(' + ')}]`;
  const mods = (log.modifiers || [])
    .map((m) => ` + ${m.value} (${m.label})`)
    .join(' ');
  return `${dice}${mods ? ' ' + mods : ''}`.trim();
};

/* ---------- frases de placeholder ---------- */
const hiddenMsgs = [
  'O Mestre moveu suas peças nas sombras…',
  'Algo se agitou por trás do escudo do Mestre…',
  'O destino girou longe dos seus olhos…',
  'Sussurros arcanos ecoaram além da mesa…',
  'Os deuses rolaram dados secretos com o Mestre…'
];

export const GameLog = ({ roomId, isMaster, onDelete, onToggleVisibility }) => {
  const pageSize = 6;
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);

  /* ---------- stream realtime ---------- */
  useEffect(() => {
    const q = query(
      collection(db, 'rooms', roomId, 'rolls'),
      orderBy('timestamp', 'desc')
    );
    const unsub = onSnapshot(q, (snap) => {
      setLogs(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setPage(1);
    });
    return () => unsub();
  }, [roomId]);

  /* ---------- paginação ---------- */
  const pageCount = Math.max(1, Math.ceil(logs.length / pageSize));
  const show = logs.slice((page - 1) * pageSize, page * pageSize);
  const go = (p) => setPage(Math.min(Math.max(p, 1), pageCount));

  return (
    <Wrapper>
      <HeaderRow>
        <Title>Registro de Eventos</Title>
        <Pagination>
          <PageButton disabled={page === 1} onClick={() => go(page - 1)}>
            <FaChevronLeft />
          </PageButton>
          {Array.from({ length: pageCount }).map((_, i) => (
            <PageButton
              key={i}
              $active={page === i + 1}
              onClick={() => go(i + 1)}
            >
              {i + 1}
            </PageButton>
          ))}
          <PageButton disabled={page === pageCount} onClick={() => go(page + 1)}>
            <FaChevronRight />
          </PageButton>
        </Pagination>
      </HeaderRow>

      <LogContainer>
        {show.map((log) => {
          const hidden = log.hidden && !isMaster;
          const crit  = !hidden && log.individualResults?.some((v) => v === 6);
          const fail  = !hidden && log.individualResults?.every((v) => v === 1);
          const variant = hidden
            ? 'hidden'
            : crit
            ? 'crit'
            : fail
            ? 'fail'
            : 'normal';

          return (
            <LogCard key={log.id} $variant={variant}>
              <LeftBar $variant={variant}>
                {hidden ? <FaCrown /> : getIcon(log.action)}
              </LeftBar>

              <Content>
                <TitleRow>
                  {hidden ? (
                    <span className='hidden-content'>{hiddenMsgs[Math.floor(Math.random() * hiddenMsgs.length)]}</span>
                  ) : (
                    <span>
                      <strong>{log.action}</strong> • {log.total}
                    </span>
                  )}

                  {isMaster && (
                    <Buttons>
                      <button
                        onClick={() => onToggleVisibility(log.id, !log.hidden)}
                        title={log.hidden ? 'Mostrar' : 'Ocultar'}
                      >
                        {log.hidden ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      <button onClick={() => onDelete(log.id)} title="Apagar">
                        <FaTrash />
                      </button>
                    </Buttons>
                  )}
                </TitleRow>

                {!hidden && (
                  <Breakdown>
                    {log.userName} — {breakdownStr(log)}
                  </Breakdown>
                )}

                {!hidden && crit && <Badge $variant="crit">Crítico!</Badge>}
                {!hidden && fail && <Badge $variant="fail">Falha Crítica</Badge>}
              </Content>
            </LogCard>
          );
        })}
      </LogContainer>
    </Wrapper>
  );
};

GameLog.propTypes = {
  roomId: PropTypes.string.isRequired,
  isMaster: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleVisibility: PropTypes.func.isRequired
};
