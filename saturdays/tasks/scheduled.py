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
		
		if task['interval'] == 'day':
			if task['interval_hour'] == now.hour and task['interval_minute'] == now.minute:
				execute_task.apply_async((task,), countdown=0)

		else:
			created_at = task['created_at'].replace(second=0, microsecond=0, tzinfo=now.tzinfo)

			if task['interval'] == 'week':
				rule = rrule(WEEKLY, interval=task['interval_count'], byminute=task['interval_minute'], byhour=task['interval_hour'], byweekday=task['interval_day'], dtstart=created_at, until=now)

			elif task['interval'] == 'month':
				rule = rrule(MONTHLY, interval=task['interval_count'], byminute=task['interval_minute'], byhour=task['interval_hour'], bymonthday=task['interval_day'], dtstart=created_at, until=now)

			elif task['interval'] == 'year':
				rule = rrule(YEARLY, interval=task['interval_count'], byminute=task['interval_minute'], byhour=task['interval_hour'], byyearday=task['interval_day'], dtstart=created_at, until=now)


			if now in rule:
				execute_task.apply_async((task,), countdown=0)


		



