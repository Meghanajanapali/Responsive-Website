$(document).ready(function() {
    fetchUsers();

    $('#userForm').on('submit', function(e) {
        e.preventDefault();
        const user = {
            name: $('#name').val(),
            email: $('#email').val(),
            age: $('#age').val(),
        };
        addUser(user);
    });
});

function fetchUsers() {
    $.get('http://localhost:3000/api/users', function(users) {
        $('#userList').empty();
        users.forEach(user => {
            $('#userList').append(`<li class="list-group-item">${user.name} (${user.email}) - ${user.age} years old <button class="btn btn-danger btn-sm float-right" onclick="deleteUser(${user.id})">Delete</button></li>`);
        });
    });
}

function addUser(user) {
    $.post('http://localhost:3000/api/users', user, function(newUser) {
        fetchUsers(); 
        $('#userForm')[0].reset(); 
    });
}
function deleteUser(id) {
    $.ajax({
        url: `http://localhost:3000/api/users/${id}`,
        type: 'DELETE',
        success: function() {
            fetchUsers(); 
        }
    });
}
