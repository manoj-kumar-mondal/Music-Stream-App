import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { actionDownloadSong, } from '../actions/stream.action';
import { EReducer } from './reducer.type';

interface IStreamState {
    songId: string | null;
    loading: boolean;
    error: {
        message: string;
        statusCode: number;
    } | null;
};

const initialState: IStreamState = {
    songId: null,
    loading: false,
    error: null
};

const customReducers = (builder: ActionReducerMapBuilder<IStreamState>) => {
    /* Download Song */
    builder.addCase(actionDownloadSong.pending, (state, action) => {
        console.log(action);
        state.loading = true;
    });
    builder.addCase(actionDownloadSong.rejected, (state, action) => {
        console.log(action);
        state.loading = false;
    });
    builder.addCase(actionDownloadSong.fulfilled, (state, action) => {
        console.log(action);
        state.loading = false;
        // state.songId = action.payload;
    });

    // /* Ping */
    // builder.addCase(actionPingToServer.pending, (state, action) => {
    //     console.log(action);
    //     state.loading = true;
    // });
    // builder.addCase(actionPingToServer.rejected, (state, action) => {
    //     state.loading = false;
    //     console.log(action);
    // });
    // builder.addCase(actionPingToServer.fulfilled, (state, action) => {
    //     state.loading = false;
    //     // state.songId = action.payload;
    //     console.log(action);
    // });
}

const streamReducer = createSlice({
    name: EReducer.STREAM,
    initialState,
    reducers: {},
    extraReducers: customReducers
});

export default streamReducer.reducer;