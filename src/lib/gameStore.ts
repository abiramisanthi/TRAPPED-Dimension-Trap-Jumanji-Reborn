import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import charHoodedSurvivor from '@/assets/char-hooded-survivor.png';
import charArmoredWarrior from '@/assets/char-armored-warrior.png';
import charExplorer from '@/assets/char-explorer.png';
import charHorrorProtagonist from '@/assets/char-horror-protagonist.png';
import zoneHorrorMansion from '@/assets/horror-mansion.jpg';
import zoneZombieCity from '@/assets/zone-zombie-city.jpg';
import zoneDinoJungle from '@/assets/zone-dino-jungle.jpg';
import zoneAlienPlanet from '@/assets/zone-alien-planet.jpg';
import zoneFrozenWorld from '@/assets/zone-frozen-world.jpg';
import zoneUnderwater from '@/assets/zone-underwater.jpg';
import zoneDarkDimension from '@/assets/zone-dark-dimension.jpg';
import zoneAncientTemple from '@/assets/zone-ancient-temple.jpg';
import zoneCyberpunk from '@/assets/zone-cyberpunk.jpg';
import zoneFinalBoss from '@/assets/zone-final-boss.jpg';

export interface GameCharacter {
  id: string;
  name: string;
  image: string;
  class: string;
  dimension: string;
  power: string;
  weakness: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  lives: number;
  avatar: string;
  characterId: string;
  level: number;
  xp: number;
  teamId?: string;
  completedDimensionIds: string[];
}

export interface Team {
  id: string;
  name: string;
  inviteCode: string;
  members: User[];
  score: number;
}

export interface Dimension {
  id: string;
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Nightmare';
  description: string;
  image: string;
  scenes: { name: string; image: string }[];
}

interface StoredAccount {
  email: string;
  password: string;
  user: User;
}

interface GameState {
  currentUser: User | null;
  team: Team | null;
  isAuthenticated: boolean;
  activeDimensionId: string | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  createTeam: (name: string) => void;
  joinTeam: (code: string) => boolean;
  leaveTeam: () => void;
  buyLives: (amount: number) => void;
  selectCharacter: (characterId: string) => void;
  startDimension: (dimensionId: string) => boolean;
  completeDimension: (dimensionId: string) => void;
  isDimensionUnlocked: (dimensionId: string) => boolean;
  usedEmails: string[];
  registeredUsers: StoredAccount[];
}

export const CHARACTERS: GameCharacter[] = [
  {
    id: 'hooded-survivor',
    name: 'The Wraith',
    image: charHoodedSurvivor,
    class: 'Shadow Walker',
    dimension: 'Haunted Horror Mansion',
    power: 'Phase Walk lets you cross cursed passages and reveal hidden trails for the team.',
    weakness: 'Harsh light burns focus and slows movement until a teammate shields you.',
  },
  {
    id: 'armored-warrior',
    name: 'Crimson Blade',
    image: charArmoredWarrior,
    class: 'Void Knight',
    dimension: 'Future Cyberpunk City',
    power: 'Aegis Rush projects a forward shield charge that absorbs heavy damage for nearby allies.',
    weakness: 'Deep water overloads the armor and cuts mobility during escape sequences.',
  },
  {
    id: 'explorer',
    name: 'The Drifter',
    image: charExplorer,
    class: 'Pathfinder',
    dimension: 'Frozen Ice World',
    power: 'Predator Sense highlights footprints, loot, trap routes, and weak points across the zone.',
    weakness: 'Pitch-dark rooms trigger tunnel vision until a teammate restores light.',
  },
  {
    id: 'horror-protagonist',
    name: 'Last Stand',
    image: charHorrorProtagonist,
    class: 'Survivor',
    dimension: 'Zombie Apocalypse City',
    power: 'Adrenaline Heal restores the closest teammate after a clutch dodge or revive moment.',
    weakness: 'Heavy bleeding reduces sprint speed until wounds are treated in a safe zone.',
  },
];

export const DIMENSIONS: Dimension[] = [
  {
    id: 'horror-mansion',
    name: 'Haunted Horror Mansion',
    difficulty: 'Medium',
    description: 'A cursed Victorian estate where reality bends and shadows hunt. Navigate haunted corridors, solve cryptic puzzles, and survive the entity within.',
    image: zoneHorrorMansion,
    scenes: [],
  },
  {
    id: 'zombie-city',
    name: 'Zombie Apocalypse City',
    difficulty: 'Medium',
    description: 'The streets are overrun. Scavenge supplies, barricade safe houses, and fight through hordes of the undead to reach the extraction point.',
    image: zoneZombieCity,
    scenes: [],
  },
  {
    id: 'dino-jungle',
    name: 'Dinosaur Jungle',
    difficulty: 'Hard',
    description: 'A prehistoric world where apex predators rule. Track through dense jungle, avoid T-Rex patrols, and discover the ancient artifact hidden in the volcano.',
    image: zoneDinoJungle,
    scenes: [],
  },
  {
    id: 'alien-planet',
    name: 'Alien Planet',
    difficulty: 'Hard',
    description: 'A bioluminescent alien world with hostile flora and fauna. Decode alien technology and survive first contact gone wrong.',
    image: zoneAlienPlanet,
    scenes: [],
  },
  {
    id: 'frozen-world',
    name: 'Frozen Ice World',
    difficulty: 'Hard',
    description: 'Sub-zero temperatures drain your life. Find warmth, navigate ice caverns, and awaken the frost giant guardian.',
    image: zoneFrozenWorld,
    scenes: [],
  },
  {
    id: 'underwater',
    name: 'Underwater Ocean World',
    difficulty: 'Hard',
    description: 'Explore sunken ruins in the deep ocean. Manage oxygen, avoid leviathans, and uncover the Atlantean secrets.',
    image: zoneUnderwater,
    scenes: [],
  },
  {
    id: 'dark-dimension',
    name: 'The Dark Dimension',
    difficulty: 'Nightmare',
    description: 'A corrupted parallel realm where floating spores, red lightning, and living shadows warp every decision.',
    image: zoneDarkDimension,
    scenes: [],
  },
  {
    id: 'ancient-temple',
    name: 'Ancient Mythology Temple',
    difficulty: 'Nightmare',
    description: 'Ancient gods test your worth through collapsing chambers, cursed relics, and living stone guardians.',
    image: zoneAncientTemple,
    scenes: [],
  },
  {
    id: 'cyberpunk-city',
    name: 'Future Cyberpunk City',
    difficulty: 'Nightmare',
    description: 'Hack the megacorp, outrun android enforcers, and decode the AI conspiracy in a neon-soaked dystopia.',
    image: zoneCyberpunk,
    scenes: [],
  },
  {
    id: 'final-boss',
    name: 'Final Boss Dimension',
    difficulty: 'Nightmare',
    description: 'Dr. Elias Kane awaits. Every choice you made and every life you lost leads to this final escape.',
    image: zoneFinalBoss,
    scenes: [],
  },
];

const generateId = () => Math.random().toString(36).substring(2, 10);
const generateInviteCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

const FAKE_TEAM_MEMBERS: Omit<User, 'teamId'>[] = [
  {
    id: 'bot1',
    name: 'ShadowWalker',
    email: 'shadowwalker@trapped.ai',
    lives: 3,
    avatar: '',
    characterId: 'hooded-survivor',
    level: 12,
    xp: 3200,
    completedDimensionIds: ['horror-mansion'],
  },
  {
    id: 'bot2',
    name: 'NightCrawler',
    email: 'nightcrawler@trapped.ai',
    lives: 3,
    avatar: '',
    characterId: 'horror-protagonist',
    level: 8,
    xp: 1800,
    completedDimensionIds: [],
  },
  {
    id: 'bot3',
    name: 'VoidHunter',
    email: 'voidhunter@trapped.ai',
    lives: 3,
    avatar: '',
    characterId: 'armored-warrior',
    level: 15,
    xp: 4500,
    completedDimensionIds: ['horror-mansion', 'zombie-city'],
  },
];

const syncStoredUser = (registeredUsers: StoredAccount[], updatedUser: User) =>
  registeredUsers.map((account) =>
    account.email === updatedUser.email ? { ...account, user: updatedUser } : account
  );

const syncTeamMember = (team: Team | null, updatedUser: User) =>
  team
    ? {
        ...team,
        members: team.members.map((member) =>
          member.id === updatedUser.id ? { ...member, ...updatedUser } : member
        ),
      }
    : null;

function isDimensionAccessible(dimensionId: string, completedDimensionIds: string[]) {
  const dimensionIndex = DIMENSIONS.findIndex((dimension) => dimension.id === dimensionId);

  if (dimensionIndex === -1) return false;
  if (dimensionIndex === 0) return true;

  return completedDimensionIds.includes(DIMENSIONS[dimensionIndex - 1].id);
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      team: null,
      isAuthenticated: false,
      activeDimensionId: null,
      usedEmails: [],
      registeredUsers: [],

      register: (name, email, password) => {
        const normalizedEmail = email.trim().toLowerCase();
        const { usedEmails, registeredUsers } = get();

        if (usedEmails.includes(normalizedEmail)) return false;

        const user: User = {
          id: generateId(),
          name,
          email: normalizedEmail,
          lives: 3,
          avatar: '',
          characterId: CHARACTERS[0].id,
          level: 1,
          xp: 0,
          completedDimensionIds: [],
        };

        set({
          currentUser: user,
          isAuthenticated: true,
          activeDimensionId: null,
          usedEmails: [...usedEmails, normalizedEmail],
          registeredUsers: [...registeredUsers, { email: normalizedEmail, password, user }],
        });

        return true;
      },

      login: (email, password) => {
        const normalizedEmail = email.trim().toLowerCase();
        const { registeredUsers } = get();
        const found = registeredUsers.find(
          (account) => account.email === normalizedEmail && account.password === password
        );

        if (!found) return false;

        set({
          currentUser: found.user,
          isAuthenticated: true,
          team: null,
          activeDimensionId: null,
        });

        return true;
      },

      logout: () => set({ currentUser: null, isAuthenticated: false, team: null, activeDimensionId: null }),

      createTeam: (name) => {
        const { currentUser, registeredUsers } = get();
        if (!currentUser) return;

        const updatedUser = { ...currentUser, teamId: generateId() };
        const team: Team = {
          id: updatedUser.teamId!,
          name,
          inviteCode: generateInviteCode(),
          members: [updatedUser, ...FAKE_TEAM_MEMBERS.slice(0, 3)] as User[],
          score: 0,
        };

        set({
          currentUser: updatedUser,
          team,
          registeredUsers: syncStoredUser(registeredUsers, updatedUser),
        });
      },

      joinTeam: (code) => {
        const { currentUser, registeredUsers } = get();
        if (!currentUser) return false;

        const teamId = generateId();
        const updatedUser = { ...currentUser, teamId };
        const team: Team = {
          id: teamId,
          name: 'The Survivors',
          inviteCode: code,
          members: [updatedUser, ...FAKE_TEAM_MEMBERS.slice(0, 2)] as User[],
          score: 1200,
        };

        set({
          currentUser: updatedUser,
          team,
          registeredUsers: syncStoredUser(registeredUsers, updatedUser),
        });

        return true;
      },

      leaveTeam: () => {
        const { currentUser, registeredUsers } = get();
        if (!currentUser) return;

        const updatedUser = { ...currentUser, teamId: undefined };
        set({
          team: null,
          currentUser: updatedUser,
          registeredUsers: syncStoredUser(registeredUsers, updatedUser),
        });
      },

      buyLives: (amount) => {
        const { currentUser, registeredUsers, team } = get();
        if (!currentUser) return;

        const updatedUser = { ...currentUser, lives: currentUser.lives + amount };
        set({
          currentUser: updatedUser,
          team: syncTeamMember(team, updatedUser),
          registeredUsers: syncStoredUser(registeredUsers, updatedUser),
        });
      },

      selectCharacter: (characterId) => {
        const { currentUser, registeredUsers, team } = get();
        if (!currentUser) return;

        const updatedUser = { ...currentUser, characterId };
        set({
          currentUser: updatedUser,
          team: syncTeamMember(team, updatedUser),
          registeredUsers: syncStoredUser(registeredUsers, updatedUser),
        });
      },

      startDimension: (dimensionId) => {
        const { currentUser } = get();
        if (!currentUser) return false;
        if (!isDimensionAccessible(dimensionId, currentUser.completedDimensionIds)) return false;

        set({ activeDimensionId: dimensionId });
        return true;
      },

      completeDimension: (dimensionId) => {
        const { currentUser, registeredUsers, team } = get();
        if (!currentUser) return;

        const completedDimensionIds = currentUser.completedDimensionIds.includes(dimensionId)
          ? currentUser.completedDimensionIds
          : [...currentUser.completedDimensionIds, dimensionId];

        const updatedUser = { ...currentUser, completedDimensionIds };

        set({
          currentUser: updatedUser,
          team: syncTeamMember(team, updatedUser),
          registeredUsers: syncStoredUser(registeredUsers, updatedUser),
          activeDimensionId: null,
        });
      },

      isDimensionUnlocked: (dimensionId) => {
        const completedDimensionIds = get().currentUser?.completedDimensionIds ?? [];
        return isDimensionAccessible(dimensionId, completedDimensionIds);
      },
    }),
    { name: 'dimension-trap-store' }
  )
);

export const LEADERBOARD = [
  { rank: 1, team: 'Phantom Reapers', score: 15200, members: 4 },
  { rank: 2, team: 'Dark Syndicate', score: 13800, members: 4 },
  { rank: 3, team: 'Void Walkers', score: 12100, members: 4 },
  { rank: 4, team: 'Shadow Legion', score: 10500, members: 3 },
  { rank: 5, team: 'Night Terrors', score: 9800, members: 4 },
  { rank: 6, team: 'Blood Moon', score: 8400, members: 4 },
  { rank: 7, team: 'The Exiled', score: 7200, members: 3 },
  { rank: 8, team: 'Wraith Squad', score: 6100, members: 4 },
  { rank: 9, team: 'Doom Brigade', score: 5500, members: 4 },
  { rank: 10, team: 'Soul Hunters', score: 4800, members: 2 },
];
