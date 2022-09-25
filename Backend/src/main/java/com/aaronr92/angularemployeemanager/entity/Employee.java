package com.aaronr92.angularemployeemanager.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@ToString
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee /*implements Serializable*/{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @NotBlank
    private String email;

    @NotBlank
    private String jobTitle;

    @NotBlank
    private String phone;

    private String imageUrl;

    private String employeeCode;
}
