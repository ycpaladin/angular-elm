

export interface State {
    isFetching: boolean;
    error: boolean;
    message?: string;

    /**
     * 当前城市
     */
    guessCity: string;

    /**
     * 当前城市id
     */
    guessCityid: string;
    /**
     * 热门城市列表
     */
    hotcity: any[];
    /**
     * 所有城市列表
     */
    groupcity: object;
}


const initialState: State = {
    isFetching: false,
    error: false,
    guessCity: '',
    guessCityid: '',
    hotcity: [],
    groupcity: {}
};

export function reducer(state: State = initialState, action: any): State {
    switch (action.type) {
        default:
            return state;
    }
}
