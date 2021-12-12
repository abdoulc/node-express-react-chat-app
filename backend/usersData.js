
const all_users = [];

function join_user(id, unsername, room){
    const user = {id, unsername, room};

    all_users.push(user);

    return user;
}

function get_current_user(idUser){
    return all_users.find(user => user.id === idUser);
}


function user_disconnect(idUser){
    const index = all_users.findIndex(user => user.id === idUser);

    if(index !==-1){
        return all_users.splice(index,1)[0];
    }
}
module.exports = {
    join_user,
    get_current_user,
    user_disconnect
}