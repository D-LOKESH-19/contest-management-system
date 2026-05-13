// src/firebase/realtime.service.js
import { database } from './firebase.init';
import { ref, set, get, push, update, remove, onValue, query, orderByChild } from 'firebase/database';

// ============ EVENTS CRUD ============
export const addEvent = async (eventData) => {
  try {
    const eventsRef = ref(database, 'events');
    const newEventRef = push(eventsRef);
    await set(newEventRef, {
      ...eventData,
      id: newEventRef.key,
      createdAt: new Date().toISOString()
    });
    return { success: true, id: newEventRef.key };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getAllEvents = async () => {
  try {
    const eventsRef = ref(database, 'events');
    const snapshot = await get(eventsRef);
    const events = [];
    snapshot.forEach((child) => {
      events.push({ id: child.key, ...child.val() });
    });
    return { success: true, events };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateEvent = async (eventId, updatedData) => {
  try {
    const eventRef = ref(database, `events/${eventId}`);
    await update(eventRef, updatedData);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const eventRef = ref(database, `events/${eventId}`);
    await remove(eventRef);
    
    // Also delete all teams for this event
    const teamsRef = ref(database, 'teams');
    const snapshot = await get(teamsRef);
    snapshot.forEach(async (child) => {
      const team = child.val();
      if (team.eventId === eventId) {
        await remove(ref(database, `teams/${child.key}`));
      }
    });
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ============ TEAMS CRUD ============
export const addTeam = async (teamData) => {
  try {
    const teamsRef = ref(database, 'teams');
    const newTeamRef = push(teamsRef);
    await set(newTeamRef, {
      ...teamData,
      id: newTeamRef.key,
      createdAt: new Date().toISOString()
    });
    return { success: true, id: newTeamRef.key };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getTeamsByEvent = async (eventId) => {
  try {
    const teamsRef = ref(database, 'teams');
    const snapshot = await get(teamsRef);
    const teams = [];
    snapshot.forEach((child) => {
      const team = child.val();
      if (team.eventId === eventId) {
        teams.push({ id: child.key, ...team });
      }
    });
    return { success: true, teams };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getAllTeams = async () => {
  try {
    const teamsRef = ref(database, 'teams');
    const snapshot = await get(teamsRef);
    const teams = [];
    snapshot.forEach((child) => {
      teams.push({ id: child.key, ...child.val() });
    });
    return { success: true, teams };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateTeam = async (teamId, updatedData) => {
  try {
    const teamRef = ref(database, `teams/${teamId}`);
    await update(teamRef, updatedData);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteTeam = async (teamId) => {
  try {
    const teamRef = ref(database, `teams/${teamId}`);
    await remove(teamRef);
    
    // Also delete scores for this team
    const scoresRef = ref(database, 'scores');
    const snapshot = await get(scoresRef);
    snapshot.forEach(async (child) => {
      const score = child.val();
      if (score.teamId === teamId) {
        await remove(ref(database, `scores/${child.key}`));
      }
    });
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ============ SCORES CRUD ============
export const addOrUpdateScore = async (eventId, teamId, score) => {
  try {
    const scoresRef = ref(database, 'scores');
    const snapshot = await get(scoresRef);
    let existingScoreId = null;
    
    snapshot.forEach((child) => {
      const scoreData = child.val();
      if (scoreData.eventId === eventId && scoreData.teamId === teamId) {
        existingScoreId = child.key;
      }
    });
    
    if (existingScoreId) {
      const scoreRef = ref(database, `scores/${existingScoreId}`);
      await update(scoreRef, {
        score: Number(score),
        updatedAt: new Date().toISOString()
      });
    } else {
      const newScoreRef = push(scoresRef);
      await set(newScoreRef, {
        eventId,
        teamId,
        score: Number(score),
        updatedAt: new Date().toISOString()
      });
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getScoresByEvent = async (eventId) => {
  try {
    const scoresRef = ref(database, 'scores');
    const snapshot = await get(scoresRef);
    const scores = [];
    snapshot.forEach((child) => {
      const score = child.val();
      if (score.eventId === eventId) {
        scores.push({ id: child.key, ...score });
      }
    });
    return { success: true, scores };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ============ LEADERBOARD (Real-time) ============
export const getLeaderboardData = (eventId, callback) => {
  const scoresRef = ref(database, 'scores');
  
  return onValue(scoresRef, async (snapshot) => {
    const scores = [];
    snapshot.forEach((child) => {
      const score = child.val();
      if (score.eventId === eventId) {
        scores.push({ id: child.key, ...score });
      }
    });
    
    // Get all teams
    const teamsResult = await getTeamsByEvent(eventId);
    if (teamsResult.success) {
      const leaderboard = teamsResult.teams.map(team => {
        const teamScore = scores.find(s => s.teamId === team.id);
        return {
          ...team,
          score: teamScore ? teamScore.score : 0
        };
      });
      
      leaderboard.sort((a, b) => b.score - a.score);
      const rankedLeaderboard = leaderboard.map((team, index) => ({
        ...team,
        rank: index + 1
      }));
      
      callback(rankedLeaderboard);
    }
  });
};

export const getTeamWithScore = async (teamId, eventId) => {
  try {
    const teamRef = ref(database, `teams/${teamId}`);
    const teamSnapshot = await get(teamRef);
    
    if (!teamSnapshot.exists()) {
      return { success: false, error: "Team not found" };
    }
    
    const team = { id: teamSnapshot.key, ...teamSnapshot.val() };
    
    // Get score
    const scoresRef = ref(database, 'scores');
    const scoresSnapshot = await get(scoresRef);
    let score = 0;
    
    scoresSnapshot.forEach((child) => {
      const scoreData = child.val();
      if (scoreData.eventId === eventId && scoreData.teamId === teamId) {
        score = scoreData.score;
      }
    });
    
    return { success: true, team: { ...team, score } };
  } catch (error) {
    return { success: false, error: error.message };
  }
};