export declare class SchoolConfig {
    id: string;
    school_id: string;
    grading_system: string;
    academic_period: string;
    passing_grade: number;
    late_fee_percentage: number;
    currency: string;
    branding: {
        primary_color: string;
        logo_url: string;
    };
    created_at: Date;
    updated_at: Date;
}
