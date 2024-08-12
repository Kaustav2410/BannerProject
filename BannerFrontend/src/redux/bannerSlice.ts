import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Banner {
  id?: string;
  title: string;
  description: string;
  url: string;
  timer: string;
}

interface BannerState {
  bannerDetails: Banner | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
interface ErrorResponse {
    custommessage: string;
  }

const initialState: BannerState = {
  bannerDetails: null,
  status: 'idle',
  error: null,
};
export const createBanner = createAsyncThunk<
  Banner, // Success return type
  Banner, // Argument type
  {
    rejectValue: ErrorResponse; // Reject type
  }
>(
  'banner/createBanner',
  async (banner, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://bannerproject-vb64.onrender.com/api/v1/create', banner);
      return response.data.banner;
    } catch (error: any) {
      return rejectWithValue(error.response.data as ErrorResponse);
    }
  }
);

export const getBanner = createAsyncThunk<
  Banner, // Success return type
  string, // Argument type
  {
    rejectValue: ErrorResponse; // Reject type
  }
>(
  'banner/getBanner',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://bannerproject-vb64.onrender.com/api/v1/${id}`);
      return response.data.banner;
    } catch (error: any) {
      return rejectWithValue(error.response.data as ErrorResponse);
    }
  }
);

export const updateBanner = createAsyncThunk<
  Banner, // Success return type
  Banner, // Argument type
  {
    rejectValue: ErrorResponse; // Reject type
  }
>(
  'banner/updateBanner',
  async (banner, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`https://bannerproject-vb64.onrender.com/api/v1/${banner.id}`, banner);
      return response.data.banner;
    } catch (error: any) {
      return rejectWithValue(error.response.data as ErrorResponse);
    }
  }
);

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBanner.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bannerDetails = action.payload;
      })
      .addCase(createBanner.rejected, (state, action: PayloadAction<ErrorResponse | undefined>) => {
        state.status = 'failed';
        state.error = action.payload?.custommessage || 'Failed to create banner';
      })
      .addCase(getBanner.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBanner.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bannerDetails = action.payload;
      })
      .addCase(getBanner.rejected, (state, action: PayloadAction<ErrorResponse | undefined>) => {
        state.status = 'failed';
        state.error = action.payload?.custommessage || 'Failed to fetch banner';
      })
      .addCase(updateBanner.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bannerDetails = action.payload;
      })
      .addCase(updateBanner.rejected, (state, action: PayloadAction<ErrorResponse | undefined>) => {
        state.status = 'failed';
        state.error = action.payload?.custommessage || 'Failed to update banner';
      });
  },
});

export default bannerSlice.reducer;
