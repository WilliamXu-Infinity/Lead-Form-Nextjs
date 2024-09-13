import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export interface Lead {
  id: string;
  name: string;
  created: string;
  status: string;
  citizenship: string;
}

interface LeadsState {
  leads: Lead[];
  searchQuery: string;
  sortOrder: 'asc' | 'desc';
  sortField: keyof Lead;
  loading: boolean;
  error: string | null;
}

const initialState: LeadsState = {
  leads: [],
  searchQuery: '',
  sortOrder: 'asc',
  sortField: 'name',
  loading: false,
  error: null,
};

const timeTranformer = ((isoDateString: string): string => {
    const date = new Date(isoDateString);
    const options: Intl.DateTimeFormatOptions = {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
})

// Thunk to fetch leads
export const fetchLeads = createAsyncThunk('leads/fetchLeads', async () => {
  // Fetch the data from PocketBase
  const resultList = await pb.collection('leaderTable').getList(1, 50, {
    // Optionally add filters or sorting if needed
  });

  // Map each RecordModel to a Lead
  const leads = resultList.items.map((record) => {
    return {
      id: record.id,
      name: record.name,  // Assuming these fields exist on record
      created: timeTranformer(record.created),
      status: record.status,
      citizenship: record.citizenship,
    } as Lead;
  });

  return leads;
});

const leadsSlice = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSortOrder(state, action: PayloadAction<'asc' | 'desc'>) {
      state.sortOrder = action.payload;
    },
    setSortField(state, action: PayloadAction<keyof Lead>) {
      state.sortField = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeads.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeads.fulfilled, (state, action: PayloadAction<Lead[]>) => {
        state.leads = action.payload;
        state.loading = false;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch leads';
      });
  },
});

export const { setSearchQuery, setSortOrder, setSortField } = leadsSlice.actions;
export default leadsSlice.reducer;
