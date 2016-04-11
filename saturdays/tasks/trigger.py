from saturdays import app
from saturdays import celery
from flask import request, abort, json

from saturdays.models.tasks.triggered import TriggeredTask

from saturdays.tasks.execute import execute_task



@celery.task(name='trigger_tasks')
def trigger_tasks(trigger_code, data={}):

	ctx = app.test_request_context()
	ctx.push()


	tasks = TriggeredTask.list({'is_online': True, 'trigger_code': trigger_code})
	for task in tasks:
		execute_task.apply_async((task, data), countdown=0)


		



