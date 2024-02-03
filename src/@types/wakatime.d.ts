interface WakatimeAllTimeResponse {
  data: {
    total_seconds: number;
    text: string;
    decimal: string;
    digital: string;
    is_up_to_date: boolean;
    percent_calculated: number;
    range: {
      start: string;
      start_date: string;
      start_text: string;
      end: string;
      end_date: string;
      end_text: string;
      timezone: string;
    };
    timeout: number;
  };
  message?: string;
  cache?: {
    is_cached: boolean;
    expires_at: string;
  };
}

interface WakatimeStatsResponse {
  data: {
    id: string;
    user_id: string;
    range: string;
    timeout: number;
    writes_only: boolean;
    holidays: number;
    status: string;
    categories: Array<{
      name: string;
      total_seconds: number;
      percent: number;
      digital: string;
      decimal: string;
      text: string;
      hours: number;
      minutes: number;
    }>;
    languages: Array<{
      name: string;
      total_seconds: number;
      percent: number;
      digital: string;
      decimal: string;
      text: string;
      hours: number;
      minutes: number;
    }>;
    is_already_updating: boolean;
    total_seconds: number;
    human_readable_total_including_other_language: string;
    daily_average_including_other_language: number;
    is_stuck: boolean;
    human_readable_daily_average_including_other_language: string;
    editors: Array<{
      name: string;
      total_seconds: number;
      percent: number;
      digital: string;
      decimal: string;
      text: string;
      hours: number;
      minutes: number;
    }>;
    daily_average: number;
    human_readable_total: string;
    days_including_holidays: number;
    operating_systems: Array<{
      name: string;
      total_seconds: number;
      percent: number;
      digital: string;
      decimal: string;
      text: string;
      hours: number;
      minutes: number;
    }>;
    is_up_to_date: boolean;
    days_minus_holidays: number;
    percent_calculated: number;
    human_readable_daily_average: string;
    is_up_to_date_pending_future: boolean;
    total_seconds_including_other_language: number;
    is_cached: boolean;
    username: string;
    is_including_today: boolean;
    human_readable_range: string;
    is_coding_activity_visible: boolean;
    is_other_usage_visible: boolean;
  };
  cache?: {
    is_cached: boolean;
    expires_at: string;
  };
}
