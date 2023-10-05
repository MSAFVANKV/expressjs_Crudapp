// in form.ejs form tag have is with add_user
$('#add_user').submit(function(event){
const name=$('#nameInput').val();
const department=$('#departmentInput').val();
const phone=$('#phoneInput').val();
if(name.length === 0 || department.length === 0 || phone.length === 0){
  event.preventDefault()
  alert("input field can't be empty");
}
  
  else{alert("Data insterted succesfully!");}

});
// function click(){
//   if(req.body.name && req.body.department && req.body.phone){
//     alert("Data insterted succesfully!");
//   }
// }

$('#update_user').submit(function(event) {
    event.preventDefault();

    const formData = $(this).serialize();
    const userId = $('#userId').val();

    $.ajax({
      url: `/api/users/${userId}`,
      type: 'PUT',
      data: formData,
      success: function(response) {
       alert("Data Updated Successfully!")
       window.location.href = 'http://localhost:3000'
      },
      error: function(error) {
        console.log(error)
      }
    });
});


// delete items.................


$(document).ready(function() {
    // Attach click event listener to delete buttons
    $('.delete-btn').on('click', function() {
      const id = $(this).data('id');
      if(confirm('Do you want to delete this record?')){
          $.ajax({
                url: '/api/users/' + id,
                method: 'DELETE',
               
                success: function(result) {
                  alert('Data Deleted Successfully');
                  location.reload();
                },
                error: function(err) {
                  console.error(err);
                }
              });
      }
      });
    });