export interface ScheduledEventLike {
  date: Date;
  startTime: { hour: number; minute: number };
  duration: { hour: number; minute: number };
}

export interface EventDayGroup<T extends ScheduledEventLike> {
  key: string;
  label: string;
  events: T[];
}

const dayNames = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const addDays = (date: Date, days: number) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

export const getEventStartDate = (event: ScheduledEventLike) => {
  const start = new Date(event.date);
  start.setHours(event.startTime.hour, event.startTime.minute, 0, 0);
  return start;
};

export const getEventEndDate = (event: ScheduledEventLike) => {
  const end = getEventStartDate(event);
  end.setHours(end.getHours() + event.duration.hour, end.getMinutes() + event.duration.minute, 0, 0);
  return end;
};

export const sortEventsByStart = <T extends ScheduledEventLike>(events: T[]) =>
  [...events].sort((left, right) => getEventStartDate(left).getTime() - getEventStartDate(right).getTime());

export const formatEventTimeRange = (event: ScheduledEventLike) => {
  const start = getEventStartDate(event);
  const end = getEventEndDate(event);
  const formatTime = (date: Date) =>
    `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  return `${formatTime(start)}-${formatTime(end)}`;
};

export const formatEventDisplayTime = (event: ScheduledEventLike, referenceDate = new Date()) =>
  `${getRelativeDayLabel(getEventStartDate(event), referenceDate)} ${formatEventTimeRange(event)}`;

export const getRelativeDayLabel = (date: Date, referenceDate = new Date()) => {
  const day = startOfDay(date);
  const reference = startOfDay(referenceDate);
  const diffDays = Math.round((day.getTime() - reference.getTime()) / 86_400_000);

  if (diffDays === 0) return '今天';
  if (diffDays === 1) return '明天';
  if (diffDays === 2) return '後天';
  if (diffDays >= 3 && diffDays < 7) return dayNames[day.getDay()];
  return `${day.getMonth() + 1}/${day.getDate()} ${dayNames[day.getDay()]}`;
};

export const groupEventsByDay = <T extends ScheduledEventLike>(events: T[], referenceDate = new Date()) =>
  sortEventsByStart(events).reduce<EventDayGroup<T>[]>((groups, event) => {
    const eventDay = startOfDay(getEventStartDate(event));
    const key = eventDay.toISOString();
    const currentGroup = groups[groups.length - 1];

    if (currentGroup?.key === key) {
      currentGroup.events.push(event);
      return groups;
    }

    groups.push({
      key,
      label: getRelativeDayLabel(eventDay, referenceDate),
      events: [event],
    });
    return groups;
  }, []);

export const findScheduleConflict = <T extends ScheduledEventLike>(
  events: T[],
  candidate: ScheduledEventLike,
) => {
  const candidateStart = getEventStartDate(candidate).getTime();
  const candidateEnd = getEventEndDate(candidate).getTime();

  const event = sortEventsByStart(events).find((existingEvent) => {
    const existingStart = getEventStartDate(existingEvent).getTime();
    const existingEnd = getEventEndDate(existingEvent).getTime();
    return candidateStart < existingEnd && candidateEnd > existingStart;
  });

  return event ? { event, timeRange: formatEventTimeRange(event) } : null;
};

export const resolveDateFromTimeText = (timeText: string, referenceDate = new Date()) => {
  const text = timeText.trim();
  const date = startOfDay(referenceDate);

  if (text.includes('明天')) return addDays(date, 1);
  if (text.includes('後天')) return addDays(date, 2);
  if (text.includes('今天')) return date;

  const weekdayIndex = dayNames.findIndex((dayName) => text.includes(dayName));
  if (weekdayIndex >= 0) {
    const todayIndex = date.getDay();
    const diffDays = (weekdayIndex - todayIndex + 7) % 7 || 7;
    return addDays(date, diffDays);
  }

  return date;
};
