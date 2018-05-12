class ItinBuilder {
    constructor () {}

    addOn() {
        let itinBlock = {};
        var activities = [];
//target created class in selected box
        $('.selected-template').map((index, element)=>{
            console.log(index);

            
            const activityId = element.querySelector(".blockBtn").id;
            // const activityName = element.querySelector('.activity-name').innerHTML;
            // const activityAddress = element.querySelector('.activity-address').innerHTML;
            // const activityOctime = element.querySelector('.activity-octime').innerHTML;
            // const activityDesc = element.querySelector('.activity-description').innerHTML;
            
            // let activity = {
            //     activityName: activityName,
            //     activityAddress: activityAddress,
            //     activityOctime: activityOctime,
            //     activityDesc: activityDesc
            // }
  
            
            activities.push(activityId);
      
        });
            itinBlock.activities = activities;
  
        $('#detail-builder').map((index, element) => {
            const itinDesc = element.querySelector('#itin-description').value;
            const itinName = element.querySelector('#itin-name').value;
            
            itinBlock.itinDesc = itinDesc;
            itinBlock.itinName = itinName;
             
        }
       
    )

        console.log(itinBlock);


    }
}

