const getGoals = () => {
    // Get goals from DB for the signed in user
    $.get('/api/goals', insertGoals);
};

const insertGoals = (res) => {
    // Once the data has been provided by the server,
    // insert it into the page as an HTML string.

    const listOfGoals = res;
    const container = $('#existing_goals');

    if (listOfGoals.length === 0) {
        container.append(`No goals yet`)
    }

    for (const goal of listOfGoals) {
        container.append(
            `<li> <span id=${goal.goal_id}>${goal.description}</span>`
        )

        $(`#${goal.goal_id}`).on('click', (evt) => {
        
            evt.preventDefault();

            // alert('you clicked me!')
            $('#goal_description').val(goal.description)
            $('#goal_id').val(goal.id)
        })
    }
};

// UPDATE GOAL


// ADD NEW GOAL
$('#new_goal').on('submit', (evt) => {
    evt.preventDefault();

    const formInputs = {
        'goal_description': $('#goal_description').val()
    };

    $.post('/api/goals', formInputs, (res) => {
        window.location = '/'
    });
});

// SHOW EXISTING GOALS (OR NONE)
if (user_id != 0) {
    getGoals();
}
else {
    $('#existing_goals').append('You need to <a href="/register">log in</a> to see goals')
}