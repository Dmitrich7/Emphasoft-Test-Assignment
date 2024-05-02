import React from 'react';
import UserTable from "../../components/UserList/UserTable";
import {Suspense} from "react";

const HomePage = () => {
    return (
        <div>
            <Suspense fallback={<div>Loading users...</div>}>
                <UserTable/>
            </Suspense>
        </div>
    );
};

export default HomePage;
