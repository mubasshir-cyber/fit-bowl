export function validateFullName(name: string): string | null {
  const trimmed = name.trim();
  if (!trimmed) {
    return 'Please enter your full name.';
  }
  if (trimmed.length < 2) {
    return 'Full name must be at least 2 characters.';
  }
  if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) {
    return 'Name should contain letters and spaces only.';
  }
  return null;
}

export function validateMobile(mobile: string): string | null {
  // Normalize: strip leading country code (+91, 91, or 0) and any non-digits
  const cleaned = mobile.replace(/^(\+91|91|0)/, '').replace(/\D/g, '');
  if (!cleaned) {
    return 'Enter a valid 10-digit Indian mobile number.';
  }
  if (!/^[6-9]\d{9}$/.test(cleaned)) {
    return 'Enter a valid 10-digit Indian mobile number.';
  }
  return null;
}

export function validateDeliveryArea(area: string): string | null {
  if (!area) {
    return 'Please select your delivery area.';
  }
  return null;
}

export function validateDeliveryDate(dateStr: string): string | null {
  if (!dateStr) {
    return 'Choose a date from Monday to Saturday.';
  }

  const selected = new Date(dateStr + 'T00:00:00');
  if (isNaN(selected.getTime())) {
    return 'Choose a date from Monday to Saturday.';
  }

  // Prevent Sundays (getDay() === 0)
  if (selected.getDay() === 0) {
    return 'Choose a date from Monday to Saturday.';
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Prevent past and today dates (orders are for tomorrow onwards)
  if (selected <= today) {
    return 'Delivery date must be at least 1 day in advance (tomorrow onwards).';
  }

  return null;
}

export function getTomorrowDateString(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // If tomorrow is Sunday, skip to Monday
  if (tomorrow.getDay() === 0) {
    tomorrow.setDate(tomorrow.getDate() + 1);
  }

  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getMaxDateString(daysAhead: number = 14): string {
  const future = new Date();
  future.setDate(future.getDate() + daysAhead);

  const year = future.getFullYear();
  const month = String(future.getMonth() + 1).padStart(2, '0');
  const day = String(future.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
