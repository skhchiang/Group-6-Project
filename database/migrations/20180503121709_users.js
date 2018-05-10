exports.up = function(knex, Promise) {
    return knex.schema.createTable('users',(users)=>{
    users.increments();
    users.string("name");
    users.string("email");
    users.integer("password");
    users.integer("fbid");
    users.boolean("is_active")
    users.timestamps(false,true);
    }).then(()=>{

        return knex.schema.createTable("cities",(cities)=>{
            cities.increments();
            cities.string("name");
            cities.boolean("is_active");
            cities.timestamps(false,true);
            });

    }).then(()=>{
    return knex.schema.createTable("itineraries",(itineraries)=>{
    itineraries.increments();
    itineraries.string("name");
    itineraries.text("description");
    itineraries.integer("cities_id").unsigned();
    itineraries.foreign("cities_id").references("cities.id");
    itineraries.boolean("is_active");
    itineraries.timestamps(false,true);
    });
    }).then(()=>{
    return knex.schema.createTable("users_itineraries",(usersItineraries)=>{
    usersItineraries.increments();
    usersItineraries.integer("users_id").unsigned();
    usersItineraries.foreign("users_id").references("users.id");
    usersItineraries.integer("itineraries_id").unsigned();
    usersItineraries.foreign("itineraries_id").references("itineraries.id");
    usersItineraries.boolean("is_create")
    usersItineraries.timestamps(false,true);
    });
    }).then(()=>{

        return knex.schema.createTable("questionsBank",(questionsBank)=>{
            questionsBank.increments();
            questionsBank.string("questions");
            questionsBank.boolean("is_active");
            questionsBank.timestamps(false,true);
    });
    }).then(()=>{

        return knex.schema.createTable("rating",(rating)=>{
            rating.increments();
            rating.integer("score per question");
            rating.integer("users_id").unsigned();
            rating.foreign("users_id").references("users.id");
            rating.integer("itineraries_id").unsigned();
            rating.foreign("itineraries_id").references("itineraries.id");
            rating.integer("questionsBank_id").unsigned();
            rating.foreign("questionsBank_id").references("questionsBank.id");
            rating.timestamps(false,true);

        });   

    }).then(()=>{
        return knex.schema.createTable("typeOfActivities",(typeOfActivities)=>{
            typeOfActivities.increments();
            typeOfActivities.string("name");
            typeOfActivities.boolean("is_active");
            typeOfActivities.timestamps(false,true);
        });

    }).then(()=>{
        return knex.schema.createTable("activities",(activities)=>{
            activities.increments();
            activities.string("name");
            activities.string("address");
            activities.text("description");
            activities.text("photo");
            activities.boolean("reviewing_status");
            activities.integer("typeOfActivities_id").unsigned();
            activities.foreign("typeOfActivities_id").references("typeOfActivities.id");
            activities.integer("cities_id").unsigned();
            activities.foreign("cities_id").references("cities.id");
            activities.boolean("is_active");
            activities.timestamps(false,true);

        });

    }).then(()=>{

        return knex.schema.createTable("itineraries_activities",(itinerariesActivities)=>{
            itinerariesActivities.increments();
            itinerariesActivities.integer("itineraries_id").unsigned();
            itinerariesActivities.foreign("itineraries_id").references("itineraries.id");
            itinerariesActivities.integer("activities_id").unsigned();
            itinerariesActivities.foreign("activities_id").references("activities.id");
            itinerariesActivities.timestamps(false,true);
        });   
    })
    }
    
    exports.down = function(knex,Promise){
        return knex.schema.dropTable('itineraries_activities')
                .then(()=>knex.schema.dropTable('activities'))
                .then(()=>knex.schema.dropTable('typeOfActivities'))
                .then(()=>knex.schema.dropTable('rating'))
                .then(()=>knex.schema.dropTable('questionsBank'))
                .then(()=>knex.schema.dropTable('users_itineraries'))
                .then(()=>knex.schema.dropTable('itineraries'))
                .then(()=>knex.schema.dropTable('cities'))
                .then(()=>knex.schema.dropTable('users'));
    }