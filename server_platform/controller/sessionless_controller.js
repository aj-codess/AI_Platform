import session from "./../service/session.js";

const create_session=(user_id,user_os)=>{

    try{

        return session.create(user_id,user_os);

    } catch(error){

        console.error({
            message: error.message,
            name: error.name,
            stack: error.stack,
          });

    }

}

const delete_session=(user_id)=>{
    try{

        return session.delete_session(user_id);

    } catch(error){

        console.error({
            message: error.message,
            name: error.name,
            stack: error.stack,
          });

    }
}

const update_lastSigned=(user_id)=>{

    return session.update_last_signed(user_id);

}

const idIsIn_session=(user_id)=>{

    return session.idIsIn_session(user_id);

}

export default {
    create_session,
    delete_session,
    update_lastSigned,
    idIsIn_session
}