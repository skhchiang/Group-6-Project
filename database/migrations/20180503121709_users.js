
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
        return knex.schema.createTable("countries",(countries)=>{
            countries.increments();
            countries.string("name");
            countries.boolean("is_active");
            countries.timestamps(false,true);
            });

    }).then(()=>{

        return knex.schema.createTable("cities",(cities)=>{
            cities.increments();
            cities.string("name");
            cities.boolean("is_active");
            cities.integer("countries_id").unsigned();
            cities.foreign("countries_id").references("countries.id");
            cities.timestamps(false,true);
            });

    }).then(()=>{
    return knex.schema.createTable("itineraries",(itineraries)=>{
    itineraries.increments();
    itineraries.string("name");
    itineraries.string("image");
    itineraries.string("description");
    itineraries.boolean("itineraries-save");
    itineraries.boolean("itineraries-create");
    itineraries.string("reviewing-status");
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
        return knex.schema.createTable("typesOfActivity",(typesOfActivity)=>{
            typesOfActivity.increments();
            typesOfActivity.string("name");
            typesOfActivity.timestamps(false,true);
        });   

    }).then(()=>{

        return knex.schema.createTable("activities",(activities)=>{
            activities.increments();
            activities.string("name");
            activities.boolean("is_active");
            activities.integer("typesOfActivity_id").unsigned();
            activities.foreign("typesOfActivity_id").references("typesOfActivity.id");
            activities.string("address");
            activities.string("description");
            activities.string("photo");
            activities.timestamps(false,true);
        });   
    }).then(()=>{

        return knex.schema.createTable("cities_activities",(cities_activities)=>{
            cities_activities.increments();
            cities_activities.integer("cities_id").unsigned();
            cities_activities.foreign("cities_id").references("cities.id");
            cities_activities.integer("activities_id").unsigned();
            cities_activities.foreign("activities_id").references("activities.id");
            cities_activities.timestamps(false,true);
    });
    })
    }
    
    exports.down = function(knex,Promise){
        return knex.schema.dropTable('cities_activities')
                .then(()=>knex.schema.dropTable('activities'))
                .then(()=>knex.schema.dropTable('typesOfActivity'))
                .then(()=>knex.schema.dropTable('rating'))
                .then(()=>knex.schema.dropTable('questionsBank'))
                .then(()=>knex.schema.dropTable('users_itineraries'))
                .then(()=>knex.schema.dropTable('itineraries'))
                .then(()=>knex.schema.dropTable('cities'))
                .then(()=>knex.schema.dropTable('countries'))
                .then(()=>knex.schema.dropTable('users'));
    }


    