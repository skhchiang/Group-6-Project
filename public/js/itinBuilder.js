class ItinBuilder {
    constructor () {}

    addOn() {
        let itinBlock = {};
        var activities = [];
//target created class in selected box
        $('.selected-template').map((index, element)=>{
            console.log(index);

            
            const activityId =  $(element).data('activity');
   
  
            
            activities.push(activityId);
      
        });
            itinBlock.activities = activities;
  
        $('#detail-builder').map((index, element) => {
            const itinDesc = element.querySelector('#itin-description').value;
            const itinName = element.querySelector('#itin-name').value;
            const cityName = city;
            itinBlock.itinDesc = itinDesc;
            itinBlock.itinName = itinName;
            itinBlock.cityName = cityName;
             
        }
       
    )
        
        console.log(itinBlock);
        return itinBlock;


    }
}

