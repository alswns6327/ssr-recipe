import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../modules/users';
import { Preloader } from '../lib/PreloadContext';
import User from '../components/User';

const UserContainer = ({ id }) => {

    const user = useSelector(state => state.users.user);

    const dispatch = useDispatch();

    useEffect(() => {
        if(user && user.id === parseInt(id, 10)) return; //사용자가 존재하고 id가 일치하는 경우 요청하지 않음
        dispatch(getUser(id));
    }, [dispatch, id, user]); // id가 바뀔 때 새로 요청을 한다.

    // 컨테이너 유효성 검사 후 return null을 하는 경우
    // null 대신 Preloader 반환

    if(!user){
        return <Preloader resolve={()=>dispatch(getUser(id))}/>;
    }

    return (
        <User user={user}/>
    );
};

export default UserContainer;