class UserMapper {
    toUserData(user){
        return UserData(user.name, user.surname);
    }
    
    toUser(user){
        return User(user.name, user.surname);
    }
}