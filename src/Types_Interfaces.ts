interface ICalendarEvent {
    id: string,
    title: string,
    start: any,
    groupID?: any
}

interface IPeriodData {
  id: number;
  start_date: string;
  onah: string;
  hefsek_date: string | null;
  notes: string | null;
}

export type { ICalendarEvent, IPeriodData };
