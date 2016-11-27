var exports = module.exports = {};


	exports.Generate_html = function(ctl_list)
	{
			var finalHtml = '';
			var panelHtml = '';
			var ctlHtml   = '';

			for(var i=0; i < ctl_list.length; i++)
			{
				var ctl 	= ctl_list[i];
				var html 	= get_ctl_html(ctl);
				ctlHtml 	+= html;
			}

			panelHtml += '<div style="padding:12em;">';
			panelHtml += '<div class="panel panel-info"><div class="panel-heading"><strong><big>Form</big></strong></div>';
			panelHtml += '<div class="panel-body"><form ng-submit="submitData(form)>" ';
			panelHtml += ctlHtml;
			panelHtml += '</form></div>';
			panelHtml += '<div class="panel-footer">'; 
			panelHtml += '<button class="btn btn-primary">submit</button>';
			panelHtml += '</div>';
			panelHtml += '</div>';
			panelHtml += '</div>';
			
			finalHtml += panelHtml;

			return finalHtml;


	}


function get_ctl_html(current_ctl)
{
	var type = current_ctl.ctlType;
	switch(type)
	{
		case 'text':
		{
			var htm = '<div class="form-group">';
			htm += '<label for="inputEmail">' + current_ctl.labelText + '</label>';
			if(current_ctl.textMode === 'multi-line')
			{
				htm += '<textarea class="form-control" rows="3" ng-model="' + current_ctl.fieldName + '"></textarea></div>';
			}
			else
			{
				htm += '<input type="text" class="form-control" id="input" ng-model="' + current_ctl.fieldName + '"></div>';
			}
			return htm;
		}
		case 'dropdown':
		{
			var htm = '<div class="form-group">';
			htm 	+= '<label for="inputEmail">' + current_ctl.labelText + '</label>';
			htm 	+=  '<div class="dropdown">';
        	htm 	+= '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown"';
        	htm     += 'aria-haspopup="true" aria-expanded="true">' + current_ctl.drpItems[0] + '  <span class="caret"></span>';
        	htm 	+= '</button><ul class="dropdown-menu" aria-labelledby="dropdownMenu1">';
        	for(var i = 0; i < current_ctl.drpItems.length; i++)
        	{
        		htm 	+= '<li><a>' + current_ctl.drpItems[i] + '</a></li>';
        	}
        	htm 	+= '</ul></div></div>';
			return htm;
		}
	}
}