/* eslint-disable */
import { IsOptional, IsString, IsEnum } from "class-validator";
import { TaskStatus } from "../../tasks/task-status.enum";

export class GetEventFilterDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsString()
    sortBy?: string;

    @IsOptional()
    @IsString()
    page?: string;

    @IsOptional()
    @IsString()
    limit?: string;
}