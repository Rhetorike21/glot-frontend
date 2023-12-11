import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist();

export const LoginState = atom({
    key: 'LoginState',
    default: false,
    effects_UNSTABLE: [persistAtom],
});

export const WritingContent = atom({
    key: 'WritingContent',
    default: '',
    //effects_UNSTABLE: [persistAtom],
});

export const WritingId = atom({
    key: 'WritingId',
    default: '',
});

export const WritingTitle = atom({
    key: 'WritingTitle',
    default: '',
});

export const WritingList = atom({
    key: 'WritingList',
    default: [],
});

export const SentenceList = atom({
    key: 'SentenceList',
    default: {},
   //effects_UNSTABLE: [persistAtom],
});

export const Sentence = atom({
    key: 'Sentence',
    default: '',
    //effects_UNSTABLE: [persistAtom],
});

export const SentenceType = atom({
    key: 'SentenceType',
    default: '',
    //effects_UNSTABLE: [persistAtom],
});

export const UserType = atom({
    key: 'UserType',
    default: 'FREE',
    effects_UNSTABLE: [persistAtom],
});