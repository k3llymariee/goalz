// SHOW EXISTING GOALS (OR NONE)
const getGoals = () => {
    // Get goals from DB for the signed in user
    $.get('/api/goals', insertGoals);
};

const insertGoals = (res) => {
    // Once the data has been provided by the server,
    // insert it into the page as an HTML string.

    const listOfGoals = res;
    const container = $('#existing_goals');

    container.empty()

    if (listOfGoals.length === 0) {
        container.append(`No goals to show`)
    }

    container.append('<p><i>Clicking on a goal will allow you to edit or delete the goal</i></p>')

    for (const goal of listOfGoals) {
        container.append(
            `<li> <span id=${goal.goal_id}>${goal.description}</span>`
        )

        $(`#${goal.goal_id}`).on('click', (evt) => {
        
            evt.preventDefault();

            // alert('you clicked me!')
            $('#goal_description').val(goal.description)
            $('#goal_id').val(goal.goal_id)
        })
    }
};

if (user_id != 0) {
    getGoals();
}
else {
    $('#existing_goals').append('You need to <a href="/register">log in</a> to see goals')
}

// clear values
const clearForm = () => {
    $('#goal_description').val('')
    $('#goal_id').val('')
};

// UPDATE GOAL
$('#update_goal').on('click', (evt) => {
    evt.preventDefault();

    const formInputs = {
        'goal_description': $('#goal_description').val(),
        'goal_id': $('#goal_id').val()
    };

    $.post('/api/goals/update', formInputs, (res) => {
        alert(res);
        getGoals();
        // no clear form here in case the user wants to update the same goal again!
    });
});

// ADD NEW GOAL
$('#new_goal').on('submit', (evt) => {
    evt.preventDefault();

    const formInputs = {
        'goal_description': $('#goal_description').val()
    };

    $.post('/api/goals', formInputs, (res) => {
        alert(res);
        getGoals();
        clearForm();
    });
});

// DELETE EXISTING GOAL
$('#delete_goal').on('click', (evt) => {
    evt.preventDefault();

    const goalDescription = $('#goal_description').val()
    const formInputs = {
        'goal_id': $('#goal_id').val()
    };

    if (confirm(`Delete ${goalDescription}?`)) {

        $.post('/api/goals/delete', formInputs, (res) => {
            alert(res);
            getGoals();
            clearForm();
        });
    }
});

// CLEAR FORM
$('#reset_goal').on('click', (evt) => {
    evt.preventDefault();
    clearForm();
    
});