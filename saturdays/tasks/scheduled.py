from saturdays import app
from saturdays import celery
from flask import request, abort, json

from saturdays.models.tasks.scheduled import ScheduledTask

from saturdays.tasks.execute import execute_task

from datetime import datetime, timedelta
from dateutil.rrule import *

from pytz import timezone


@celery.task(name='scheduled_tasks')
def scheduled_tasks():

	ctx = app.test_request_context()
	ctx.push()


	now = datetime.now(timezone(app.config['TIMEZONE'])).replace(second=0, microsecond=0)

	tasks = ScheduledTask.list({'is_online': True})
	for task in tasks:
		
		if task['frequency'] == 'day':
			if task['frequency_hour'] == now.hour and task['frequency_minute'] == now.minute:
				execute_task.apply_async((task,), countdown=0)

		else:
			created_at = task['created_at'].replace(second=0, microsecond=0, tzinfo=now.tzinfo)

			if task['frequency'] == 'week':
				rule = rrule(WEEKLY, interval=task['frequency_count'], byminute=task['frequency_minute'], byhour=task['frequency_hour'], byweekday=task['frequency_day'], dtstart=created_at, until=now)

			elif task['frequency'] == 'month':
				rule = rrule(MONTHLY, interval=task['frequency_count'], byminute=task['frequency_minute'], byhour=task['frequency_hour'], bymonthday=task['frequency_day'], dtstart=created_at, until=now)

			elif task['frequency'] == 'year':
				rule = rrule(YEARLY, interval=task['frequency_count'], byminute=task['frequency_minute'], byhour=task['frequency_hour'], byyearday=task['frequency_day'], dtstart=created_at, until=now)


			if now in rule:
				execute_task.apply_async((task,), countdown=0)


		

