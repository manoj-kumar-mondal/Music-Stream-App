import { createAsyncThunk } from '@reduxjs/toolkit';
import { EReducerStream } from '../reducers/reducer.type';
import Api from '@/apis/api';
import { ApiError } from '@/apis/error';

export const actionDownloadSong = createAsyncThunk(
    EReducerStream.DOWNLOAD_SONG,
    async (songId: string, thunkApi) => {
        try {
            const { data } = await Api.getSong(songId);
            return data;
        } catch (error) {
            const apiError = new ApiError(error);
            return thunkApi.rejectWithValue(apiError);
        }
    }
);