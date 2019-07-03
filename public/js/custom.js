$(document).ready(function () {
    $(document).on('click', '.delete-contact', function(){
        $('.loader').show();
        let id = $(this).attr('data-id');
        alert(id);
        $.ajax({
        type:'DELETE',
        url: '/contacts/'+id,
        success: function(response) {
            alert('Deleting Contact');
            $('.loader').hide();
            window.location.href='/contacts/all';
        },
        error: function(err){
            console.log(err);
        }
        });
    });
});