import  Sequelize  from "sequelize";

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './conturi.db'
});


const Student  = sequelize.define('student', {

    id:{
        type:Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    firstName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            isEmail: true
        }
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

const Professor  = sequelize.define('professor', {

    id:{
        type:Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    firstName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            isEmail: true
        }
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
        
    }
});

const Session  = sequelize.define('session', {

    id:{
        type:Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },

    begin:{
            type: Sequelize.DATE,
            allowNull: false
        },
    end: {
            type: Sequelize.DATE,
            allowNull: false
        },
    locuri:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
});
const Application  = sequelize.define('application', {

    id:{
        type:Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },

    begin: {
            type: Sequelize.DATE,
            allowNull: false
        },
    end: {
            type: Sequelize.DATE,
            allowNull: false
        },
    tema:{
        type: Sequelize.STRING,
        allowNull: false
    }
});

Professor.hasMany(Session,{foreignKey: 'professorId'});
Session.belongsTo(Professor,{foreignKey: 'professorId'});

Student.hasMany(Application,{foreignKey: 'studentId'});
Application.belongsTo(Student,{foreignKey: 'studentId'}); 

async function initialize(){
    await sequelize.authenticate();
    await sequelize.sync();
}

export {
    initialize,
    Student,
    Professor,
    Session,
    Application
}