// select avg(total_score) 
// from (
//     -- Get total scores per user
//     select user_id, sum(scores_per_question) as sum_of_score
//     from rating 
//     where itineraies_id = 1 
//     group by user_id

//     -- Output:
//     -- user_id, sum_of_score 
//     -- 1        30
//     -- 2        20
//     -- 3        40
// ) as sum_scores