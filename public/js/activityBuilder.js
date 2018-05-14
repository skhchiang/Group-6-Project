class ActivityBuilder {
    constructor () {}

    addOn() {
        let activityBlock = {};

//target created class in selected box
        $('#activity-builder').map((index, element)=>{
            // console.log(index);

            

            const activityName = element.querySelector('#acti-name').innerHTML;
            const activityAddress = element.querySelector('#acti-address').innerHTML;
            const activityDesc = element.querySelector('#acti-description').innerHTML;
            const activityCity = element.querySelector('#acti-city').innerHTML;
            const activityType = $('select').val();
             
                activityBlock.name = activityName,
                activityBlock.address = activityAddress,
                activityBlock.description = activityDesc,
                activityBlock.cities_id = activityCity,
                activityBlock.typeOfActivities_id = activityType;
            
  
        });

  
        
          return activityBlock;


    }
}

