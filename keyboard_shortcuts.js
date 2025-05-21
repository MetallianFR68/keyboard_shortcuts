function keyboard_shortcuts_show_help()
{
	$('#keyboard_shortcuts_help').dialog('open')
}

$(function ()
{

	// initialize a dialog window
	$('#keyboard_shortcuts_help').dialog({
		autoOpen: false,
		draggable: true,
		modal: true,
		resizable: false,
		width: 950,
		title: rcmail.gettext("keyboard_shortcuts.keyboard_shortcuts")
	})

	// fire up the keypress event listener
	$(document).keydown(function (e)
	{
		return key_pressed(e)
	})


	function key_pressed(e)
	{
		// special case. If we hit ctrl-enter, and we're composing, and we have focus, then send email
		if (rcmail.env.action == 'compose' && e.which == 13 && e.ctrlKey && $("*:focus").is("#composebody"))
		{
			$('.button.send').click()
			return false
		}

		// check if some element has focus. If it does, skip this plugin.
		if ($("*:focus").is("textarea, input"))
			return true

		if (rcmail.env.action == 'compose' || rcmail.env.task == 'login' || e.ctrlKey || e.metaKey)
			return true

		//BOITE DE RECEPTION
		if (rcmail.env.action == '')
		{
			//? = help
			if (e.shiftKey == true && e.keyCode == 188)
			{
				$('#keyboard_shortcuts_help').dialog('open')
				return false
			}

			//F3 = locate folder
			if (e.shiftKey == false && e.keyCode == 114)
			{
				rcmail.command('plugin.contextmenu_folder.folder_locate')
				return false
			}

			//F4 = create folder
			if (e.shiftKey == false && e.keyCode == 115)
			{
				rcmail.command('plugin.contextmenu_folder.contact_folder_create')
				return false
			}

			//F5 = copy to folder
			if (e.shiftKey == false && e.keyCode == 116)
				if (rcmail.message_list.get_selection().length > 0)
				{
					rcmail.command('plugin.contextmenu_folder.message_copy')
					return false
				}

			//F6 = move to folder
			if (e.shiftKey == false && e.keyCode == 117)
				if (rcmail.message_list.get_selection().length > 0)
				{
					rcmail.command('plugin.contextmenu_folder.message_move')
					return false
				}

			//A = mark all as read
			if (e.shiftKey == true && e.keyCode == 65)
			{
				rcmail.command('select-all', 'page')
				rcmail.command('mark', 'read')
				return false
			}

			//C = collapse-all
			if (e.shiftKey == true && e.keyCode == 67)
			{
				rcmail.command('collapse-all')
				return false
			}

			//E = expand-all
			if (e.shiftKey == true && e.keyCode == 69)
			{
				rcmail.command('expand-all')
				return false
			}

			//R = reply-all
			if (e.shiftKey == true && e.keyCode == 82)
			{
				if (rcmail.message_list.selection.length == 1)
					rcmail.command('reply-all')
				return false
			}

			//U = expand-unread
			if (e.shiftKey == true && e.keyCode == 85)
			{
				rcmail.command('expand-unread')
				return false
			}

			//a = select all
			if (e.shiftKey == false && e.keyCode == 65)
			{
				rcmail.command('select-all', 'page')
				return false
			}

			//c = compose
			if (e.shiftKey == false && e.keyCode == 67)
			{
				rcmail.command('compose')
				return false
			}

			//d = delete
			if (e.shiftKey == false && e.keyCode == 68)
			{
				rcmail.command('delete', '', rcmail)
				return false
			}

			//f = forward
			if (e.shiftKey == false && e.keyCode == 70)
			{
				if (rcmail.message_list.selection.length == 1)
					rcmail.command('forward')
				return false
			}

			//j = previous page (similar to Gmail)
			if (e.shiftKey == false && e.keyCode == 74)
			{
				rcmail.command('previouspage')
				return false
			}

			//k = next page (similar to Gmail)
			if (e.shiftKey == false && e.keyCode == 75)
			{
				rcmail.command('nextpage')
				return false
			}

			//m = mark read/unread (similar to Thunderbird)
			if (e.shiftKey == false && e.keyCode == 77)
			{
				var uid = rcmail.message_list.get_selection()
				if (uid && uid.length > 0)
				{
					var mid = rcmail.message_list.rows[uid[0]].id
					if ($('tr#' + mid).hasClass('unread'))
						rcmail.command('mark', 'read')
					else
						rcmail.command('mark', 'unread')
				}
				else
					return true
			}

			//p = print
			if (e.shiftKey == false && e.keyCode == 80)
			{
				if (rcmail.message_list.selection.length == 1)
					rcmail.command('print')
				return false
			}

			//r = reply
			if (e.shiftKey == false && e.keyCode == 82)
			{
				if (rcmail.message_list.selection.length == 1)
					rcmail.command('reply')
				return false
			}

			//s = search
			if (e.shiftKey == false && e.keyCode == 83)
			{
				$('#mailsearchform').focus()
				$('#mailsearchform').select()
				return false
			}

      if (typeof rcube_calendar != 'undefined')
      {
        //t = appointment
        if (e.shiftKey == false && e.keyCode == 84)
        {
          rcmail.command('calendar-create-from-mail','',this,event)
          return false
        }

        //T = Calendar
        if (e.shiftKey == true && e.keyCode == 84)
        {
          rcmail.command('switch-task','calendar',this,event)
          return false
        }
      }
			

			//u = update (check for mail)
			if (e.shiftKey == false && e.keyCode == 85)
			{
				rcmail.command('checkmail')
				return false
			}

			return false
		}

		//VISUALISATION DE COURRIEL
		else if (rcmail.env.action == 'show' || rcmail.env.action == 'preview')
		{
			// R = reply-all
			if (e.shiftKey == true && e.keyCode == 82)
			{
				rcmail.command('reply-all')
				return false
			}

			// c = compose
			if (e.shiftKey == false && e.keyCode == 67)
			{
				rcmail.command('compose')
				return false
			}

			// d = delete
			if (e.shiftKey == false && e.keyCode == 68)
			{
				rcmail.command('delete')
				return false
			}

			// f = forward
			if (e.shiftKey == false && e.keyCode == 70)
			{
				rcmail.command('forward')
				return false
			}

			// j = previous message (similar to Gmail)
			if (e.shiftKey == false && e.keyCode == 74)
			{
				rcmail.command('previousmessage')
				return false
			}

			// k = next message (similar to Gmail)
			if (e.shiftKey == false && e.keyCode == 75)
			{
				rcmail.command('nextmessage')
				return false
			}

			// p = print
			if (e.shiftKey == false && e.keyCode == 80)
			{
				rcmail.command('print')
				return false
			}

			// r = reply
			if (e.shiftKey == false && e.keyCode == 82)
			{
				rcmail.command('reply')
				return false
			}

			return false
		}
	}
})
