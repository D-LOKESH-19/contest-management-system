// src/firebase/firestore.service.js
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  where,
  getDoc,
  orderBy,
  onSnapshot
} from "firebase/firestore";
import { db } from "./firebase.init";

// ============ EVENTS CRUD ============
export const addEvent = async (eventData) => {
  try {
    const docRef = await addDoc(collection(db, "events"), {
      ...eventData,
      createdAt: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getAllEvents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "events"));
    const events = [];
    querySnapshot.forEach((doc) => {
      events.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, events };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateEvent = async (eventId, updatedData) => {
  try {
    const eventRef = doc(db, "events", eventId);
    await updateDoc(eventRef, updatedData);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteEvent = async (eventId) => {
  try {
    await deleteDoc(doc(db, "events", eventId));
    
    // Also delete all teams for this event
    const teamsQuery = query(collection(db, "teams"), where("eventId", "==", eventId));
    const teamsSnapshot = await getDocs(teamsQuery);
    teamsSnapshot.forEach(async (teamDoc) => {
      await deleteDoc(doc(db, "teams", teamDoc.id));
    });
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ============ TEAMS CRUD ============
export const addTeam = async (teamData) => {
  try {
    const docRef = await addDoc(collection(db, "teams"), {
      ...teamData,
      createdAt: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getTeamsByEvent = async (eventId) => {
  try {
    const q = query(collection(db, "teams"), where("eventId", "==", eventId));
    const querySnapshot = await getDocs(q);
    const teams = [];
    querySnapshot.forEach((doc) => {
      teams.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, teams };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getAllTeams = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "teams"));
    const teams = [];
    querySnapshot.forEach((doc) => {
      teams.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, teams };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateTeam = async (teamId, updatedData) => {
  try {
    const teamRef = doc(db, "teams", teamId);
    await updateDoc(teamRef, updatedData);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteTeam = async (teamId) => {
  try {
    await deleteDoc(doc(db, "teams", teamId));
    
    // Also delete scores for this team
    const scoresQuery = query(collection(db, "scores"), where("teamId", "==", teamId));
    const scoresSnapshot = await getDocs(scoresQuery);
    scoresSnapshot.forEach(async (scoreDoc) => {
      await deleteDoc(doc(db, "scores", scoreDoc.id));
    });
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ============ SCORES CRUD ============
export const addOrUpdateScore = async (eventId, teamId, score) => {
  try {
    // Check if score exists
    const q = query(
      collection(db, "scores"), 
      where("eventId", "==", eventId),
      where("teamId", "==", teamId)
    );
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      // Create new score
      await addDoc(collection(db, "scores"), {
        eventId,
        teamId,
        score: Number(score),
        updatedAt: new Date().toISOString()
      });
    } else {
      // Update existing score
      const scoreDoc = querySnapshot.docs[0];
      await updateDoc(doc(db, "scores", scoreDoc.id), {
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
    const q = query(collection(db, "scores"), where("eventId", "==", eventId));
    const querySnapshot = await getDocs(q);
    const scores = [];
    querySnapshot.forEach((doc) => {
      scores.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, scores };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ============ LEADERBOARD DATA (with real-time) ============
export const getLeaderboardData = (eventId, callback) => {
  const scoresQuery = query(
    collection(db, "scores"),
    where("eventId", "==", eventId)
  );
  
  return onSnapshot(scoresQuery, async (snapshot) => {
    const scores = [];
    snapshot.forEach((doc) => {
      scores.push({ id: doc.id, ...doc.data() });
    });
    
    // Get all teams
    const teamsResult = await getTeamsByEvent(eventId);
    if (teamsResult.success) {
      // Merge scores with teams
      const leaderboard = teamsResult.teams.map(team => {
        const teamScore = scores.find(s => s.teamId === team.id);
        return {
          ...team,
          score: teamScore ? teamScore.score : 0
        };
      });
      
      // Sort by score (descending)
      leaderboard.sort((a, b) => b.score - a.score);
      
      // Add rank
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
    const teamRef = doc(db, "teams", teamId);
    const teamDoc = await getDoc(teamRef);
    
    if (!teamDoc.exists()) {
      return { success: false, error: "Team not found" };
    }
    
    const team = { id: teamDoc.id, ...teamDoc.data() };
    
    // Get score
    const scoreQuery = query(
      collection(db, "scores"),
      where("teamId", "==", teamId),
      where("eventId", "==", eventId)
    );
    const scoreSnapshot = await getDocs(scoreQuery);
    const score = scoreSnapshot.empty ? 0 : scoreSnapshot.docs[0].data().score;
    
    return { success: true, team: { ...team, score } };
  } catch (error) {
    return { success: false, error: error.message };
  }
};