package com.concesionario.app.web.rest;

import com.concesionario.app.domain.Trabajador;
import com.concesionario.app.repository.TrabajadorRepository;
import com.concesionario.app.service.TrabajadorService;
import com.concesionario.app.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.concesionario.app.domain.Trabajador}.
 */
@RestController
@RequestMapping("/api")
public class TrabajadorResource {

    private final Logger log = LoggerFactory.getLogger(TrabajadorResource.class);

    private static final String ENTITY_NAME = "trabajador";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TrabajadorService trabajadorService;

    private final TrabajadorRepository trabajadorRepository;

    public TrabajadorResource(TrabajadorService trabajadorService, TrabajadorRepository trabajadorRepository) {
        this.trabajadorService = trabajadorService;
        this.trabajadorRepository = trabajadorRepository;
    }

    /**
     * {@code POST  /trabajadors} : Create a new trabajador.
     *
     * @param trabajador the trabajador to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new trabajador, or with status {@code 400 (Bad Request)} if the trabajador has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/trabajadors")
    public ResponseEntity<Trabajador> createTrabajador(@Valid @RequestBody Trabajador trabajador) throws URISyntaxException {
        log.debug("REST request to save Trabajador : {}", trabajador);
        if (trabajador.getId() != null) {
            throw new BadRequestAlertException("A new trabajador cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Trabajador result = trabajadorService.save(trabajador);
        return ResponseEntity
            .created(new URI("/api/trabajadors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /trabajadors/:id} : Updates an existing trabajador.
     *
     * @param id the id of the trabajador to save.
     * @param trabajador the trabajador to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated trabajador,
     * or with status {@code 400 (Bad Request)} if the trabajador is not valid,
     * or with status {@code 500 (Internal Server Error)} if the trabajador couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/trabajadors/{id}")
    public ResponseEntity<Trabajador> updateTrabajador(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Trabajador trabajador
    ) throws URISyntaxException {
        log.debug("REST request to update Trabajador : {}, {}", id, trabajador);
        if (trabajador.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, trabajador.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!trabajadorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Trabajador result = trabajadorService.save(trabajador);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, trabajador.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /trabajadors/:id} : Partial updates given fields of an existing trabajador, field will ignore if it is null
     *
     * @param id the id of the trabajador to save.
     * @param trabajador the trabajador to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated trabajador,
     * or with status {@code 400 (Bad Request)} if the trabajador is not valid,
     * or with status {@code 404 (Not Found)} if the trabajador is not found,
     * or with status {@code 500 (Internal Server Error)} if the trabajador couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/trabajadors/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Trabajador> partialUpdateTrabajador(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Trabajador trabajador
    ) throws URISyntaxException {
        log.debug("REST request to partial update Trabajador partially : {}, {}", id, trabajador);
        if (trabajador.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, trabajador.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!trabajadorRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Trabajador> result = trabajadorService.partialUpdate(trabajador);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, trabajador.getId().toString())
        );
    }

    /**
     * {@code GET  /trabajadors} : get all the trabajadors.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of trabajadors in body.
     */
    @GetMapping("/trabajadors")
    public ResponseEntity<List<Trabajador>> getAllTrabajadors(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Trabajadors");
        Page<Trabajador> page = trabajadorService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /trabajadors/:id} : get the "id" trabajador.
     *
     * @param id the id of the trabajador to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the trabajador, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/trabajadors/{id}")
    public ResponseEntity<Trabajador> getTrabajador(@PathVariable Long id) {
        log.debug("REST request to get Trabajador : {}", id);
        Optional<Trabajador> trabajador = trabajadorService.findOne(id);
        return ResponseUtil.wrapOrNotFound(trabajador);
    }

    /**
     * {@code DELETE  /trabajadors/:id} : delete the "id" trabajador.
     *
     * @param id the id of the trabajador to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/trabajadors/{id}")
    public ResponseEntity<Void> deleteTrabajador(@PathVariable Long id) {
        log.debug("REST request to delete Trabajador : {}", id);
        trabajadorService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
