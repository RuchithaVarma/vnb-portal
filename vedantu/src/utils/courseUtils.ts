import { Course } from "@/types";

// Helper function to determine if a course is for kids
export const isKidsCourse = (course: Course): boolean => {
  // Primary check: explicit flag from admin panel
  // We check for both true/false and "true"/"false" strings to be safe with different data sources
  if (course.isKidsCourse !== undefined && course.isKidsCourse !== null) {
    return String(course.isKidsCourse) === "true";
  }

  // Fallback heuristics for existing data
  const kidsGradePatterns = [
    /class\s*[1-8]\b/i,
    /primary/i,
    /elementary/i,
    /grade\s*[1-8]\b/i,
    /kg/i,
    /kindergarten/i,
    /nursery/i,
    /pre[-\s]?school/i,
    /play[-\s]?school/i,
  ];

  const gradesMatch = kidsGradePatterns.some(
    (pattern) => pattern.test(course.grades || "") || pattern.test(course.title || ""),
  );

  // Check if age group indicates it's for kids (e.g., "3-5", "6-8", etc.)
  const kidsAgePatterns = [
    /age\s*[0-9]+[-\s]*[0-9]*/i,
    /\b[0-9]+[-\s]*[0-9]*\s*years?\b/i,
  ];

  const ageMatch =
    course.ageGroup &&
    kidsAgePatterns.some((pattern) => pattern.test(course.ageGroup!));

  // Check explicit category
  const categoryMatch =
    course.category === "kids" || course.category === "primary";

  // Check for class numbers in grades or title
  const classNumbers =
    (course.grades || "").match(/class\s*(\d+)/i) ||
    (course.title || "").match(/class\s*(\d+)/i);
  const classNumber = classNumbers ? parseInt(classNumbers[1]) : 0;
  const classMatch = classNumber > 0 && classNumber <= 8;

  return (
    gradesMatch ||
    ageMatch ||
    categoryMatch ||
    classMatch ||
    false
  );
};

// Filter courses for kids
export const filterKidsCourses = (courses: Course[]): Course[] => {
  return courses.filter((course) => isKidsCourse(course));
};

// Filter courses based on user role
export const filterCoursesByRole = (
  courses: Course[],
  userRole: string | undefined,
): Course[] => {
  if (!userRole) return courses; // Show all courses if not logged in

  switch (userRole) {
    case "student":
      // For students, show all courses (they'll be filtered further by enrollment)
      return courses;
    case "teacher":
      // For teachers, show all courses (they can see everything)
      return courses;
    case "admin":
      // For admins, show all courses
      return courses;
    default:
      return courses;
  }
};

// Check if user should see kids courses section
export const shouldShowKidsCourses = (
  userRole: string | undefined,
  userGrade?: string,
): boolean => {
  if (!userRole) return true; // Show to non-logged in users

  // Always show to admins and teachers
  if (userRole === "admin" || userRole === "teacher") return true;

  // For students, check if they are in appropriate grade
  if (userRole === "student" && userGrade) {
    const gradeNumber = parseInt(userGrade.match(/\d+/)?.[0] || "0");
    return gradeNumber > 0 && gradeNumber <= 8; // Show to students in class 1-8
  }

  return true; // Default to showing
};

// Filter courses by category
export const filterCoursesByCategory = (
  courses: Course[],
  category: string,
): Course[] => {
  if (category === "kids") {
    return filterKidsCourses(courses);
  }

  return courses.filter((course) => {
    if (category === "all") return true;
    return course.category === category;
  });
};

// Get course difficulty level
export const getCourseDifficulty = (course: Course): string => {
  if (course.difficulty) return course.difficulty;

  // Infer difficulty from grades
  if (
    course.grades.includes("Class 1") ||
    course.grades.includes("Class 2") ||
    course.grades.includes("KG") ||
    course.grades.includes("Kindergarten")
  ) {
    return "Beginner";
  }

  if (course.grades.includes("Class 3") || course.grades.includes("Class 4")) {
    return "Elementary";
  }

  if (course.grades.includes("Class 5") || course.grades.includes("Class 6")) {
    return "Intermediate";
  }

  if (course.grades.includes("Class 7") || course.grades.includes("Class 8")) {
    return "Upper Intermediate";
  }

  if (course.grades.includes("Class 9") || course.grades.includes("Class 10")) {
    return "Advanced";
  }

  return "All Levels";
};

// Format course duration for display
export const formatDuration = (duration: string): string => {
  // Already in good format, but can enhance if needed
  return duration;
};

// Check if course has enrollment data
export const hasEnrollmentData = (course: Course): boolean => {
  return course.enrolled > 0;
};

// Get enrollment display text
export const getEnrollmentText = (course: Course): string => {
  if (course.enrolled >= 1000) {
    return `${(course.enrolled / 1000).toFixed(1)}k+`;
  }
  return course.enrolled.toString();
};

// Determine course badge color based on category/difficulty
export const getCourseBadgeColor = (course: Course): string => {
  if (isKidsCourse(course)) return "bg-pink-100 text-pink-700 border-pink-200";

  switch (course.category) {
    case "academic":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "competitive":
      return "bg-purple-100 text-purple-700 border-purple-200";
    case "skill":
      return "bg-green-100 text-green-700 border-green-200";
    case "languages":
      return "bg-orange-100 text-orange-700 border-orange-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};
