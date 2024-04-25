import { EntityRepository, Repository } from "typeorm";
import { Board } from "./board.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@EntityRepository(Board) // deprecated 됨
export class BoardRepository extends Repository<Board> {

}